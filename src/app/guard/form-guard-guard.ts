import { CanDeactivateFn } from '@angular/router';
import { Observable } from 'rxjs';

export interface CanComponentDeactivate {
  hasUnsavedChanges: () => boolean;
}

export const formGuardGuard: CanDeactivateFn<CanComponentDeactivate> = (
  component,
  currentRoute,
  currentState,
  nextState
) => {
  return component.hasUnsavedChanges()
    ? confirm('You have unsaved changes. Are you sure you want to leave?')
    : true;
};
