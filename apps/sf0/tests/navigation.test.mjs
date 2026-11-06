import assert from 'node:assert/strict';
import test from 'node:test';
import { NAV, WORKSPACES, navigationHash, readNavigation, resolveNavigation } from '../src/navigation.js';

test('existing report links keep working and select the corresponding workspace', () => {
  assert.deepEqual(readNavigation('#overview'), { view: 'overview', workspaceId: 'analytics' });
  assert.deepEqual(readNavigation('#local'), { view: 'local', workspaceId: 'search' });
  assert.deepEqual(readNavigation('#health'), { view: 'health', workspaceId: 'health' });
  assert.deepEqual(readNavigation(''), { view: 'overview', workspaceId: 'analytics' });
});

test('shared reports retain the selected workspace through reload and browser history', () => {
  for (const workspace of WORKSPACES) {
    for (const view of workspace.items) {
      const route = { view, workspaceId: workspace.id };
      assert.deepEqual(readNavigation(navigationHash(route)), route);
    }
  }
  assert.deepEqual(resolveNavigation('pages', 'content'), { view: 'pages', workspaceId: 'content' });
  assert.deepEqual(resolveNavigation('pages', 'health'), { view: 'pages', workspaceId: 'health' });
});

test('workspace tools keep context while cross-workspace report links choose a valid menu', () => {
  assert.deepEqual(resolveNavigation('settings', 'search'), { view: 'settings', workspaceId: 'search' });
  assert.deepEqual(resolveNavigation('integrations', 'health'), { view: 'integrations', workspaceId: 'health' });
  assert.deepEqual(resolveNavigation('conversion', 'search'), { view: 'conversion', workspaceId: 'analytics' });
  assert.deepEqual(readNavigation('#invalid/missing'), { view: 'overview', workspaceId: 'analytics' });
});

test('every workspace has a valid default and only offers implemented reports', () => {
  for (const workspace of WORKSPACES) {
    assert.ok(workspace.items.includes(workspace.defaultView));
    assert.equal(new Set(workspace.items).size, workspace.items.length);
    for (const view of workspace.items) assert.ok(NAV.some(item => item.id === view));
  }
});
