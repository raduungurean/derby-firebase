import {useSelector} from 'react-redux';
import {useEffect} from 'react';
import ddRef from '../services/drop-down-ref';
import i18n from 'i18n-js';
import isEmpty from 'lodash/isEmpty';

export function useEditGroupAlerts(callback) {
  const groups = useSelector((state) => state.groups);
  const {requestSentEdit, errorEditing} = groups;

  useEffect(() => {
    if (errorEditing) {
      const errorKeys = Object.keys(errorEditing);

      let errSubject = i18n.t('eg_error_alert_subject');
      let errDescription = i18n.t('eg_error_alert_description');

      if (errorKeys.includes('already-exists')) {
        errSubject = i18n.t('eg_already_exists_error_alert_subject');
        errDescription = i18n.t('eg_already_exists_error_alert_description');
        callback(['name']);
      }
      ddRef
        .getDdRef()
        .alertWithType('error', errSubject, errDescription, {type: 'ERROR_EG'});
    }
    if (requestSentEdit) {
      ddRef
        .getDdRef()
        .alertWithType(
          'info',
          i18n.t('eg_success_alert_subject'),
          i18n.t('eg_success_alert_description'),
          {type: 'SUCCESS_EG'},
        );
    }
  }, [errorEditing, requestSentEdit]);
}

export function useDeleteGroupsAlerts(callback) {
  const groupsState = useSelector((state) => state.groups);
  const {errorDeleting, requestSentDelete} = groupsState;
  useEffect(() => {
    if (errorDeleting) {
      let errSubject = i18n.t('dg_error_alert_subject');
      let errDescription = i18n.t('dg_error_alert_description');
      const errorKeys = Object.keys(errorDeleting);

      if (errorKeys.includes('not-deletable')) {
        errSubject = i18n.t('dg_not_deletable_error_alert_subject');
        errDescription = i18n.t('dg_not_deletable_error_alert_description');
        callback(['name']);
      }

      ddRef
        .getDdRef()
        .alertWithType('error', errSubject, errDescription, {type: 'ERROR_DG'});
      callback();
    }
    if (requestSentDelete) {
      ddRef
        .getDdRef()
        .alertWithType(
          'info',
          i18n.t('dg_success_alert_subject'),
          i18n.t('dg_success_alert_description'),
          {type: 'SUCCESS_DG'},
        );
      callback();
    }
  }, [errorDeleting, requestSentDelete]);
}

export function useLeaveGroupsAlerts(callback) {
  const groupsState = useSelector((state) => state.groups);
  const {errorLeaving, requestSentLeave} = groupsState;

  useEffect(() => {
    if (errorLeaving) {
      let errSubject = i18n.t('leave_g_error_alert_subject');
      let errDescription = i18n.t('leave_g_error_alert_description');

      ddRef
        .getDdRef()
        .alertWithType('error', errSubject, errDescription, {type: 'ERROR_LG'});
      callback();
    }
    if (requestSentLeave) {
      ddRef
        .getDdRef()
        .alertWithType(
          'info',
          i18n.t('leave_g_success_alert_subject'),
          i18n.t('leave_g_success_alert_description'),
          {type: 'SUCCESS_LG'},
        );
      callback();
    }
  }, [errorLeaving, requestSentLeave]);
}

export function useAddGroupAlerts(callback) {
  const groups = useSelector((state) => state.groups);
  const {requestSentAdd, errorAdding} = groups;
  useEffect(() => {
    if (errorAdding) {
      const errorKeys = Object.keys(errorAdding);
      let errSubject = i18n.t('ag_error_alert_subject');
      let errDescription = i18n.t('ag_error_alert_description');

      if (errorKeys.includes('already-exists')) {
        errSubject = i18n.t('ag_already_exists_error_alert_subject');
        errDescription = i18n.t('ag_already_exists_error_alert_description');
        callback(['name']);
      }

      if (errorKeys.includes('too-many-groups')) {
        errSubject = i18n.t('ag_too_many_groups_error_alert_subject');
        errDescription = i18n.t('ag_too_many_groups_error_alert_description');
      }

      ddRef
        .getDdRef()
        .alertWithType('error', errSubject, errDescription, {type: 'ERROR_AG'});
    }
    if (requestSentAdd) {
      ddRef
        .getDdRef()
        .alertWithType(
          'info',
          i18n.t('ag_success_alert_subject'),
          i18n.t('ag_success_alert_description'),
          {type: 'SUCCESS_AG'},
        );
    }
  }, [errorAdding, requestSentAdd]);
}

export function useUpdatePasswordAlerts() {
  const profile = useSelector((state) => state.profile);
  const {errorUpdatingPassword, requestSentUpdatePassword} = profile;
  useEffect(() => {
    if (errorUpdatingPassword) {
      ddRef
        .getDdRef()
        .alertWithType(
          'error',
          i18n.t('update_password_err_alert_subject'),
          i18n.t('update_password_err_alert_description'),
          {type: 'ERROR_PASS'},
        );
    }
    if (requestSentUpdatePassword) {
      ddRef
        .getDdRef()
        .alertWithType(
          'info',
          i18n.t('update_password_success_alert_subject'),
          i18n.t('update_password_success_alert_description'),
          {type: 'SUCCESS_PASS'},
        );
    }
  }, [errorUpdatingPassword, requestSentUpdatePassword]);
}

export function useKickOutAlerts() {
  const players = useSelector((state) => state.players);
  const {errorKickingOut, requestKickOutSuccess} = players;

  useEffect(() => {
    if (errorKickingOut) {
      ddRef
        .getDdRef()
        .alertWithType(
          'error',
          i18n.t('players_kick_out_err_alert_subject'),
          i18n.t('players_kick_out_err_alert_description'),
          {type: 'ERROR_KO'},
        );
    }
    if (requestKickOutSuccess) {
      ddRef
        .getDdRef()
        .alertWithType(
          'info',
          i18n.t('players_kick_out_success_alert_subject'),
          i18n.t('players_kick_out_success_alert_description'),
          {type: 'SUCCESS_KO'},
        );
    }
  }, [errorKickingOut, requestKickOutSuccess]);
}

export function usePlayerSettingsAlerts() {
  const players = useSelector((state) => state.players);
  const {
    errorUpdatingPlayerSettings,
    requestSentUpdatePlayerSettings,
  } = players;

  useEffect(() => {
    if (!isEmpty(errorUpdatingPlayerSettings)) {
      ddRef
        .getDdRef()
        .alertWithType(
          'error',
          i18n.t('players_update_sett_err_alert_subject'),
          i18n.t('players_update_sett_err_alert_description'),
          {type: 'ERROR_PLST'},
        );
    }
    if (!isEmpty(requestSentUpdatePlayerSettings)) {
      ddRef
        .getDdRef()
        .alertWithType(
          'info',
          i18n.t('players_update_sett_success_alert_subject'),
          i18n.t('players_update_sett_success_alert_description'),
          {type: 'SUCCESS_PLST'},
        );
    }
  }, [errorUpdatingPlayerSettings, requestSentUpdatePlayerSettings]);
}

export function useAddMatchAlerts(callbackSuccess) {
  const matches = useSelector((state) => state.matches);
  const {errorAdding, added} = matches;

  useEffect(() => {
    if (!isEmpty(errorAdding)) {
      ddRef
        .getDdRef()
        .alertWithType(
          'error',
          i18n.t('match_add_err_alert_subject'),
          i18n.t('match_add_err_alert_description'),
          {type: 'ERROR_MTAD'},
        );
    }
    if (added) {
      ddRef
        .getDdRef()
        .alertWithType(
          'info',
          i18n.t('match_add_success_alert_subject'),
          i18n.t('match_add_success_alert_description'),
          {type: 'SUCCESS_MTAD'},
        );
      callbackSuccess();
    }
  }, [errorAdding, added]);
}

export function useUpdateProfileAlerts() {
  const profile = useSelector((state) => state.profile);
  const {errorUpdatingProfile} = profile;
  useEffect(() => {
    if (errorUpdatingProfile) {
      ddRef
        .getDdRef()
        .alertWithType(
          'error',
          i18n.t('update_profile_err_alert_subject'),
          i18n.t('update_profile_err_alert_description'),
          {type: 'ERROR_PROF'},
        );
    }
  }, [errorUpdatingProfile]);
}

export function useSubscribeAlerts() {
  const matches = useSelector((state) => state.matches);
  const {errorSubscribing} = matches;
  useEffect(() => {
    console.log('### errorSubscribing changed', errorSubscribing);
    if (errorSubscribing) {
      ddRef
        .getDdRef()
        .alertWithType(
          'error',
          i18n.t('match_err_subscribe_alert_subject'),
          i18n.t('match_err_subscribe_alert_description'),
          {type: 'ERROR_SUB'},
        );
    }
  }, [errorSubscribing]);
}

export function useUnsubscribeAlerts() {
  const matches = useSelector((state) => state.matches);
  const {errorUnsubscribing} = matches;
  useEffect(() => {
    if (errorUnsubscribing) {
      ddRef
        .getDdRef()
        .alertWithType(
          'error',
          i18n.t('match_err_unsubscribe_alert_subject'),
          i18n.t('match_err_unsubscribe_alert_description'),
          {type: 'ERROR_UNSUB'},
        );
    }
  }, [errorUnsubscribing]);
}

export function useResendVerificationEmailAlerts() {
  const authState = useSelector((state) => state.auth);
  const {resendingErrorMessage, resendingMessage} = authState;

  useEffect(() => {
    if (resendingErrorMessage) {
      let errSubject = i18n.t('general_resend_error_alert_subject');
      let errDescription = i18n.t('general_resend_error_alert_description');

      ddRef.getDdRef().alertWithType('error', errSubject, errDescription, {
        type: 'ERROR_RESEND',
      });
    }

    if (resendingMessage) {
      ddRef
        .getDdRef()
        .alertWithType(
          'info',
          i18n.t('general_resend_success_alert_subject'),
          i18n.t('general_resend_success_alert_description'),
          {type: 'SUCCESS_RESEND'},
        );
    }
  }, [resendingErrorMessage, resendingMessage]);
}

export function useAcceptInviteAlerts(callback) {
  const invitesState = useSelector((state) => state.invites);
  const {errorAccepting, requestSentAccept} = invitesState;

  useEffect(() => {
    if (errorAccepting) {
      let errSubject = i18n.t('invites_accept_a_error_alert_subject');
      let errDescription = i18n.t('invites_accept_a_error_alert_description');

      ddRef.getDdRef().alertWithType('error', errSubject, errDescription, {
        type: 'ERROR_A_INV',
      });
      callback();
    }
    if (requestSentAccept) {
      ddRef
        .getDdRef()
        .alertWithType(
          'info',
          i18n.t('invites_accept_a_success_alert_subject'),
          i18n.t('invites_accept_a_success_alert_description'),
          {type: 'SUCCESS_A_INV'},
        );
      callback();
    }
  }, [errorAccepting, requestSentAccept]);
}

export function useRejectInviteAlerts(callback) {
  const invitesState = useSelector((state) => state.invites);
  const {errorRejecting, requestSentReject} = invitesState;

  useEffect(() => {
    if (errorRejecting) {
      let errSubject = i18n.t('invites_reject_a_error_alert_subject');
      let errDescription = i18n.t('invites_reject_a_error_alert_description');

      ddRef.getDdRef().alertWithType('error', errSubject, errDescription, {
        type: 'ERROR_R_INV',
      });
      callback();
    }
    if (requestSentReject) {
      ddRef
        .getDdRef()
        .alertWithType(
          'info',
          i18n.t('invites_reject_a_success_alert_subject'),
          i18n.t('invites_reject_a_success_alert_description'),
          {type: 'SUCCESS_R_INV'},
        );
      callback();
    }
  }, [errorRejecting, requestSentReject]);
}

export function useDeleteMatchAlerts(callback) {
  const matchesState = useSelector((state) => state.matches);
  const {errorDeleting, deleted} = matchesState;

  useEffect(() => {
    if (errorDeleting) {
      let errSubject = i18n.t('match_delete_error_alert_subject');
      let errDescription = i18n.t('match_delete_error_alert_description');

      ddRef.getDdRef().alertWithType('error', errSubject, errDescription, {
        type: 'ERROR_D_MT',
      });
      callback();
    }
    if (deleted) {
      ddRef
        .getDdRef()
        .alertWithType(
          'info',
          i18n.t('match_delete_success_alert_subject'),
          i18n.t('match_delete_success_alert_description'),
          {type: 'SUCCESS_D_MT'},
        );
      callback();
    }
  }, [errorDeleting, deleted]);
}
