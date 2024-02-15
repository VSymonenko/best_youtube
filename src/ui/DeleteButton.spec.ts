/**
 * @vitest-environment jsdom
 */

import { beforeEach, expect, test, vi } from 'vitest';

import { CreateButton } from './DeleteButton';

beforeEach(() => {
  vi.spyOn(globalThis.Math, 'random').mockReturnValue(0.5);
})


test('should rendered correctly', () => {
  const button = CreateButton();
  expect(button).toMatchSnapshot();
});
