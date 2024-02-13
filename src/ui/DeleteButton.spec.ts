/**
 * @vitest-environment jsdom
 */

import { expect, test } from 'vitest';

import { CreateButton } from './DeleteButton';

test('should rendered correctly', () => {
  const button = CreateButton();
  expect(button).toMatchSnapshot();
});
