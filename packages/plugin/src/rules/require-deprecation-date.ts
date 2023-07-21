import { DirectiveNode } from 'graphql';
import { FromSchema } from 'json-schema-to-ts';
import { GraphQLESTreeNode, valueFromNode } from '../estree-converter/index.js';
import { GraphQLESLintRule } from '../types.js';
import { getNodeName } from '../utils.js';

// eslint-disable-next-line unicorn/better-regex
const DATE_REGEX1 = /^\d{2}\/\d{2}\/\d{4}$/;
const DATE_REGEX2 = /^\d{4}(?:\/\d{2}){2}$/;

const MESSAGE_REQUIRE_DATE = 'MESSAGE_REQUIRE_DATE';
const MESSAGE_INVALID_FORMAT = 'MESSAGE_INVALID_FORMAT';
const MESSAGE_INVALID_DATE = 'MESSAGE_INVALID_DATE';
const MESSAGE_CAN_BE_REMOVED = 'MESSAGE_CAN_BE_REMOVED';

const schema = {
  type: 'array',
  maxItems: 1,
  items: {
    type: 'object',
    additionalProperties: false,
    properties: {
      argumentName: {
        type: 'string',
      },
    },
  },
} as const;

export type RuleOptions = FromSchema<typeof schema>;

export const rule: GraphQLESLintRule<RuleOptions> = {
  meta: {
    type: 'suggestion',
    hasSuggestions: true,
    docs: {
      category: 'Schema',
      description:
        'Require deletion date on `@deprecated` directive. Suggest removing deprecated things after deprecated date.',
      url: 'https://the-guild.dev/graphql/eslint/rules/require-deprecation-date',
      examples: [
        {
          title: 'Incorrect',
          code: /* GraphQL */ `
            type User {
              firstname: String @deprecated
              firstName: String
            }
          `,
        },
        {
          title: 'Incorrect',
          code: /* GraphQL */ `
            type User {
              firstname: String @deprecated(reason: "Use 'firstName' instead")
              firstName: String
            }
          `,
        },
        {
          title: 'Correct',
          code: /* GraphQL */ `
            type User {
              firstname: String
                @deprecated(reason: "Use 'firstName' instead", deletionDate: "25/12/2022")
              firstName: String
            }
          `,
        },
      ],
    },
    messages: {
      [MESSAGE_REQUIRE_DATE]:
        'Directive "@deprecated" must have a deletion date for {{ nodeName }}',
      [MESSAGE_INVALID_FORMAT]:
        'Deletion date must be in format "DD/MM/YYYY" or "YYYY-MM-DD" for {{ nodeName }}',
      [MESSAGE_INVALID_DATE]: 'Invalid "{{ deletionDate }}" deletion date for {{ nodeName }}',
      [MESSAGE_CAN_BE_REMOVED]: '{{ nodeName }} сan be removed',
    },
    schema,
  },
  create(context) {
    return {
      'Directive[name.value=deprecated]'(node: GraphQLESTreeNode<DirectiveNode>) {
        const argName = context.options[0]?.argumentName || 'deletionDate';
        const deletionDateNode = node.arguments?.find(arg => arg.name.value === argName);

        if (!deletionDateNode) {
          context.report({
            node: node.name,
            messageId: MESSAGE_REQUIRE_DATE,
            data: {
              nodeName: getNodeName(node.parent),
            },
          });
          return;
        }
        const deletionDate = valueFromNode(deletionDateNode.value as any);
        const isValidDate1 = DATE_REGEX1.test(deletionDate);
        const isValidDate2 = DATE_REGEX2.test(deletionDate);

        if (!isValidDate1 && !isValidDate2) {
          context.report({
            node: deletionDateNode.value,
            messageId: MESSAGE_INVALID_FORMAT,
            data: { nodeName: getNodeName(node.parent) },
          });
          return;
        }
        let day, month, year;
        if (isValidDate1) {
          [day, month, year] = deletionDate.split('/');
        } else if (isValidDate2) {
          [year, month, day] = deletionDate.split('-');
        }
        day = day.padStart(2, '0');
        month = month.padStart(2, '0');
        const deletionDateInMS = Date.parse(`${year}-${month}-${day}`);

        if (Number.isNaN(deletionDateInMS)) {
          context.report({
            node: deletionDateNode.value,
            messageId: MESSAGE_INVALID_DATE,
            data: {
              deletionDate,
              nodeName: getNodeName(node.parent),
            },
          });
          return;
        }

        const canRemove = Date.now() > deletionDateInMS;

        if (canRemove) {
          const { parent } = node as any;
          const nodeName = parent.name.value;
          context.report({
            node: parent.name,
            messageId: MESSAGE_CAN_BE_REMOVED,
            data: { nodeName: getNodeName(parent) },
            suggest: [
              {
                desc: `Remove \`${nodeName}\``,
                fix: fixer => fixer.remove(parent),
              },
            ],
          });
        }
      },
    };
  },
};
