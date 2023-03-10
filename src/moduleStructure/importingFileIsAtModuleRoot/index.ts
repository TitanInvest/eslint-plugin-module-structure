import { last, pathIsInsideOfModulePrivate } from '../helpers';

export function importingFileIsAtModuleRoot(importingPath: string, importedPath: string): boolean {
  // Just defensive coding. No module to be at root of.
  if (!pathIsInsideOfModulePrivate(importedPath)) {
    return true;
  }
  if (!importedPath.endsWith('/private') && importedPath.lastIndexOf('/private/') === 1) {
    return true;
  }
  // Remove file name. Only leave directory path.
  const truncatedImportingPath = importingPath.slice(0, importingPath.lastIndexOf('/'));
  const splitImportingPath = truncatedImportingPath.split('/');
  const splitImportedPath = importedPath.replace(/^@/, '').split('/');
  const poppedPathSegments = [];
  while (splitImportedPath.length && last(splitImportedPath) !== last(splitImportingPath)) {
    poppedPathSegments.push(splitImportedPath.pop());
  }

  // If there was a private segment removed, and it wasn't the last one popped, it's not just above the correct module. (e.g. nested).
  if (
    poppedPathSegments?.indexOf('private') !== -1 &&
    poppedPathSegments?.indexOf('private') !== poppedPathSegments.length - 1
  ) {
    return false;
  }
  if (!splitImportedPath.length) {
    return false;
  }

  while (splitImportedPath.length) {
    const importedDir = splitImportedPath.pop();
    const importingDir = splitImportingPath.pop();
    if (importedDir !== importingDir) {
      return false;
    }
  }

  return true;
}
