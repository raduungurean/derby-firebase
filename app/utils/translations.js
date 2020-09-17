import i18n from 'i18n-js';

const ro = {
  date_formats_day: '%A, %d-%m-%Y',
  date_formats_short: '%d-%m-%Y',
  date_formats_time: '%H:%M',
  date: {
    month_names: [
      'Ianuarie',
      'Februarie',
      'Martie',
      'Aprilie',
      'Mai',
      'Iunie',
      'Iulie',
      'August',
      'Septembrie',
      'Octombrie',
      'Noiembrie',
      'Decembrie',
    ],
    abbr_month_names: [
      'Ian',
      'Feb',
      'Mar',
      'Apr',
      'Mai',
      'Iun',
      'Iul',
      'Aug',
      'Sep',
      'Oct',
      'Noi',
      'Dec',
    ],
    day_names: [
      'Duminica',
      'Luni',
      'Marti',
      'Miercuri',
      'Joi',
      'Vineri',
      'Sambata',
    ],
  },

  // layout
  general_email_not_verified_1:
    'Contul tau nu este verificat. ' +
    'Pentru a-l verifica te rugam sa accesezi linkul din email. ' +
    'Daca nu ai primit email de inregistrare atunci: ',
  general_email_not_verified_2: '',
  general_filter_by_group: 'Filtru dupa %{group}.',
  general_filter_by_group_button: 'Selecteaza alt grup',
  general_email_not_button_resend: 'Retrimite emailul de verificare',
  general_resend_error_alert_subject: 'Emailul nu a fost trimis',
  general_resend_error_alert_description:
    'A aparut o problema la trimiterea emailului. Te rugam sa incerci mai tarziu',
  general_resend_success_alert_subject: 'Succes',
  general_resend_success_alert_description:
    'Ti-am retrimis emailul. Pentru a confirma te rugam sa urmezi instructiunile din email',

  // drawer items
  drawer_label_home: 'Acasa',
  drawer_label_profile: 'Profilul Meu',
  drawer_label_logout: 'Iesire',
  drawer_label_password: 'Schimba Parola',
  drawer_label_profile_picture: 'Poza de profil',
  drawer_label_invites: 'Invitatii',

  // drawer container
  drawer_edit_image_modal_edit_button: 'Schimba',

  // home tabs
  home_tab_matches: 'Meciuri',
  home_tab_players: 'Jucatori',
  home_tab_groups: 'Grupurile Mele',
  header_group_invite: 'Invita un jucator nou',

  // groups dd
  placeholder_dd_select_group: 'Alege group',

  // headers
  header_title_home: 'Derby.Today',
  header_title_profile: 'Derby.Today',
  header_title_password: 'Derby.Today',
  header_group_edit: 'Modifica groupul',
  header_group_add: 'Creeaza grup',
  header_edit_profile_picture: 'Derby.Today',
  header_invites: 'Invitatii',
  header_player: 'Informatii jucator',
  header_players: 'Lista jucatori',
  header_player_settings: 'Setari jucator',
  header_match_add: 'Derby.Today',
  header_match_edit: 'Derby.Today',
  header_match_edit_teams: 'Derby.Today',
  header_match_edit_score: 'Derby.Today',
  header_match: 'Derby.Today',

  // player settings screen
  player_settings_save: 'Salveaza',
  player_settings_kick_out: 'kick out',
  player_settings_cancel: 'reset checkboxes',
  players_update_sett_err_alert_subject: 'Eroare',
  players_update_sett_err_alert_description:
    'A aparut o eroare. Te rugam sa incerci mai tarziu',
  players_update_sett_success_alert_subject: 'Succes',
  players_update_sett_success_alert_description: 'Setarile au fost schimbate.',

  // player kick out
  player_kick_out_modal_confirm:
    'Esti sigur ca vrei sa-l dai afara pe %{player} din grupul: %{group}?',
  player_kick_out_modal_ok: 'Da',
  player_kick_out_modal_ok_progress: 'se da afara...',
  player_kick_out_modal_cancel: 'Renunta',

  // edit profile picture screen
  edit_profile_take: 'Fa o poza',
  edit_profile_pick: 'Alege din galerie',
  edit_profile_picture_label: 'Poza de profil',

  // auth screen:
  auth_sign_in_tab: 'Conecteaza-te',
  auth_sign_up_tab: 'Cont nou',
  auth_forgot_password_label: 'Ai uitat parola?',
  auth_have_account_link: 'Ai cont? Click aici sa te conectezi.',
  auth_s_in_email_label: 'Adresa de email',
  auth_s_in_password_label: 'Parola',
  auth_s_in_submit_label: 'Conecteaza-te',
  auth_s_in_alert_error_title: 'Eroare',
  auth_s_in_alert_error_description: 'Utilizator sau parola gresite.',
  auth_s_up_first_name_label: 'Prenume',
  auth_s_up_last_name_label: 'Nume',
  auth_s_up_email_label: 'Email',
  auth_s_up_password_label: 'Parola',
  auth_s_up_password_confirmation_label: 'Confirma Parola',
  auth_s_up_submit_label: 'Inregistreaza-te',
  auth_s_up_alert_error_title: 'Eroare',
  auth_s_up_alert_error_description: 'Te rugam sa incerci din nou mai tarziu.',
  auth_s_up_alert_success_title: 'Succes',
  auth_s_up_alert_success_description: 'Ai fost inregistrat cu succes.',
  auth_forgot_password_title: 'Recuperare parola',
  auth_fp_email_label: 'Adresa email',
  auth_fp_submit_label: 'Trimite',
  auth_fp_alert_error_title: 'Eroare',
  auth_fp_alert_error_description:
    'A aparut o eroare. Te rugam sa incerci mai tarziu',
  auth_fp_alert_success_title: 'Succes',
  auth_fp_alert_success_description: 'Te rugam sa-ti verifici adresa de email',

  // matches screen
  matches_screen_capacity: '%{count} jucatori',
  matches_screen_minutes: '%{count} minute',
  matches_screen_info: 'Match info:',
  matches_screen_created_by: 'Creat de:',
  matches_screen_label_upcoming: 'Upcoming',
  matches_screen_label_canceled: 'Anulat',
  matches_screen_ill_be_there: 'Vin si eu',
  matches_screen_menu_edit: 'Modifica',
  matches_screen_menu_delete: 'Sterge meciul',
  matches_screen_not_this_time: 'Nu pot sa ajung',
  matches_screen_set_score: 'Adauga scorul',
  matches_screen_set_teams: 'Formeaza echipele',
  matches_screen_change_score: 'Modifica scorul',
  matches_screen_confirmations_locked: 'Confirmarile sunt blocate',
  match_screen_playing_now: 'Se joaca acum',
  matches_screen_no_matches_in_group:
    'Inca nu a fost creat nici un meci. Dupa ce administratorul grupului va crea un meci, te vei putea inscrie.',
  matches_page_delete_match_modal_cancel: 'Renunta',
  matches_page_delete_match_modal_ok_progress: 'se sterge',
  matches_page_delete_match_modal_ok: 'Sterge',
  matches_page_delete_match_modal_confirm:
    'Esti sigur ca vrei sa stergi acest meci?',

  match_delete_error_alert_subject: 'Eroare',
  match_delete_error_alert_description: 'Meciul nu a fost sters.',
  match_delete_success_alert_subject: 'Succes',
  match_delete_success_alert_description: 'Meciul a fost sters',

  // match screen
  match_screen_subscribed_players: 'Jucatori inscrisi',
  match_team_title: 'Echipa',
  match_err_subscribe_alert_subject: 'Eroare',
  match_err_subscribe_alert_description:
    'A aparut o eroare. Inscrierea nu s-a realizat.',
  match_err_unsubscribe_alert_subject: 'Eroare',
  match_err_unsubscribe_alert_description: 'A aparut o eroare.',
  matches_screen_subscribed: 'Esti inscris.',

  // players
  players_list_no_results: 'This group does not have any players',
  players_match_numbers: '%{matches} matches, %{wins} wins, %{performance}',
  players_no_matches: 'nici un meci jucat',
  players_player_settings: 'setari',
  players_kick_out_err_alert_subject: 'Error',
  players_kick_out_err_alert_description:
    'There was an error, please try again later',
  players_kick_out_success_alert_subject: 'Success',
  players_kick_out_success_alert_description: 'Successfully kicked out',

  // player
  player_screen_label_username: 'Username:',
  player_screen_label_date: 'Creat la:',
  player_chart_not_available: 'Grafic indisponibil',
  player_screen_label_performance: 'Performance',
  player_screen_label_overview: 'Overview',

  // invite player screen
  invite_player_form_title:
    'Invita un jucator sa se alature grupului: %{group} ',
  invite_player_email_label: 'Adresa de email a jucatorului',
  invite_player_submit_label: 'Invita',

  // groups screen
  groups_context_menu_leave: 'Paraseste grupul',
  groups_context_menu_edit: 'Modifica',
  groups_context_menu_delete: 'Sterge',
  groups_context_menu_invite: 'Invita un jucator',
  groups_page_delete_group_modal_cancel: 'Renunta',
  groups_page_delete_group_modal_ok: 'Sterge',
  groups_page_delete_group_modal_ok_progress: 'se sterge',
  groups_page_delete_group_modal_confirm:
    'Esti sigur ca vrei sa stergi acest grup?',
  groups_page_leave_group_modal_cancel: 'Renunta',
  groups_page_leave_group_modal_ok_progress: 'se paraseste',
  groups_page_leave_group_modal_ok: 'Paraseste grupul',
  groups_page_leave_group_modal_confirm:
    'Esti sigur ca vrei sa parasesti acest grup?',
  dg_success_alert_description: 'Grupul a fost sters',
  dg_success_alert_subject: 'Succes',
  dg_error_alert_subject: 'Eroare',
  dg_error_alert_description: 'A aparut o eroare. Grupul nu a fost sters.',
  groups_created_by: 'Creat de %{user}. %{users} jucatori',
  groups_count_games: 'Numar meciuri: %{matches}',
  dg_not_deletable_error_alert_subject: 'Eroare',
  dg_not_deletable_error_alert_description:
    'Momentan acest grup nu se poate sterge.',
  leave_g_error_alert_subject: 'Eroare',
  leave_g_error_alert_description: 'A aparut o eroare. Nu ai parasit grupul.',
  leave_g_success_alert_subject: 'Succes',
  leave_g_success_alert_description: 'Ai parasit grupul.',
  invite_player_error_alert_subject: 'Eroare',
  invite_player_error_alert_description: 'Invitatia nu s-a trimis.',
  invite_player_success_alert_subject: 'Succes',
  invite_player_success_alert_description: 'Invitatia a fost trimisa.',
  groups_page_share_group_label_info:
    'Copiaza acest link si trimite-l prietenilor tai',
  groups_page_share_group_cancel: 'Renunta',
  groups_page_share_group_copy: 'Copiaza',
  groups_no_results: 'Nu faci parte din nici un grup',
  groups_select_cancel: 'Renunta',

  // invites list
  invites_invited_by: 'Ai fost invitat de %{user} la data de %{date}',
  invites_page_reject_modal_cancel: 'Renunta',
  invites_page_reject_modal_ok_progress: 'se respinge...',
  invites_page_reject_modal_ok: 'Respinge Invitatia',
  invites_page_reject_modal_confirm:
    'Esti sigur ca vrei sa respingi aceasta invitatie?',
  invites_accept_group_modal_cancel: 'Renunta',
  invites_accept_group_modal_ok_progress: 'se accepta...',
  invites_accept_group_modal_ok: 'Accepta',
  invites_accept_group_modal_confirm:
    'Esti sigur ca vrei sa accepti aceasta invitatie?',
  invites_invited_by_details: 'Invitatie trimisa de',
  invites_group_name_details: 'Numele grupului',
  invites_accept_a_error_alert_subject: 'Eroare',
  invites_accept_a_error_alert_description: 'Invitatia nu a fost acceptata',
  invites_accept_a_success_alert_subject: 'Succes',
  invites_accept_a_success_alert_description:
    'Invitatia a fost acceptata cu success',
  invites_reject_a_error_alert_subject: 'Eroare',
  invites_reject_a_error_alert_description: 'Nu s-a putut respinge invitatia',
  invites_reject_a_success_alert_subject: 'Succes',
  invites_reject_a_success_alert_description: 'Invitatia a fost respinsa',
  invites_list_no_results: 'Nu ai nici o invitatie.',

  // edit group screen
  eg_placeholder_group_name: 'Numele grupului',
  eg_placeholder_short_description: 'Desciere',
  eg_button_submit: 'Modifica',
  eg_short_description_hint:
    'O scurta descriere a grupului. Campul nu este obligatoriu',
  eg_group_name_hint:
    'Ex: Numele Echipei, Numele Organizatiei, Prietenii lui Radu, etc',
  eg_error_alert_subject: 'Eroare',
  eg_error_alert_description: 'A aparut o eroare.',
  eg_success_alert_subject: 'Succes',
  eg_success_alert_description: 'Informatiile grupului au fost modificate',
  eg_already_exists_error_alert_subject: 'Eroare',
  eg_already_exists_error_alert_description:
    'Deja exista un grup cu acest nume',
  eg_allow_share: 'Permite share',
  eg_allow_share_hint_false:
    'Modifica (ON), daca doresti sa permiti inregistrarea prietenilor tai prin distribuirea unui link unic',
  eg_allow_share_hint_true:
    'Modifica (OFF), daca doresti sa NU permiti inregistrarea prietenilor tai prin distribuirea unui link unic',

  // add group screen
  ag_placeholder_group_name: 'Numele grupului',
  ag_group_name_hint:
    'Ex: Numele Echipei, Numele Organizatiei, Prietenii lui Radu, etc',
  ag_placeholder_short_description: 'Descriere',
  ag_short_description_hint:
    'O scurta descriere a grupului. Campul nu este obligatoriu',
  ag_button_submit: 'Creeaza',
  ag_error_alert_subject: 'Error',
  ag_error_alert_description: 'Error creating the group',
  ag_already_exists_error_alert_subject: 'Eroare',
  ag_already_exists_error_alert_description:
    'Deja exista un grup cu acest nume',
  ag_success_alert_subject: 'Succes',
  ag_success_alert_description: 'Grupul a fost creat.',
  ag_too_many_groups_error_alert_subject: 'Eroare',
  ag_too_many_groups_error_alert_description: 'Numarul maxim de grupuri este 5',

  // profile screen
  profile_form_title: 'Profilul Meu',
  profile_placeholder_first_name: 'Prenume',
  profile_placeholder_last_name: 'Nume',
  profile_placeholder_email: 'Email',
  profile_placeholder_username: 'Username',
  profile_button_update: 'Modifica',
  profile_card_upload_profile_image: 'Poza de profil',
  profile_card_pick_an_image: 'Alege o poza',
  profile_card_crop_modal_title: 'Alege o poza',
  profile_card_crop_modal_submit: 'Incarca',
  profile_placeholder_password: 'Parola',
  profile_placeholder_password_confirmation: 'Confirma parola',
  profile_button_update_password: 'Modifica Parola',
  update_profile_err_alert_subject: 'Eroare',
  update_profile_err_alert_description:
    'A aparut o eroate. Te rugam incearca din nou mai tarziu.',
  update_password_err_alert_subject: 'Eroare',
  update_password_err_alert_description:
    'A aparut o eroate. Te rugam incearca din nou mai tarziu.',
  update_password_success_alert_subject: 'Succes',
  update_password_success_alert_description: 'Parola a fost modificata.',
  password_form_title: 'Modificare Parola',

  // match add screen
  match_add_group_name_label: 'Selecteaza grupul',
  match_add_players_label: 'Numarul de jucatori',
  match_add_minutes_label: 'Durata',
  match_add_select_group_label: 'Alege din lista',
  match_add_button_label: 'Creeaza',
  match_add_location_label: 'Locatia',
  match_add_select_location_label: 'Alege din lista',
  match_add_select_date: 'Selecteaza data meciului',
  match_add_form_title: 'Creaza un nou meci',
  match_add_err_alert_subject: 'Eroare',
  match_add_err_alert_description: 'Te rugam sa incerci mai tarziu',
  match_add_success_alert_subject: 'Succes',
  match_add_success_alert_description: 'Meciul a fost adaugat.',

  // match edit screen
  match_edit_form_title: 'Modifica detaliile meciului',
  match_edit_score_form_title: 'Modifica scorul',
  match_edit_teams_form_title: 'Formeaza echipele',
  match_edit_button_label: 'Modifica',
  match_edit_score_teams_not_set:
    'Nu se poate adauga scorul. Mai intai formeaza echipele.',
};

const en = {
  date_formats_day: '%a, %d %b %Y',
  date_formats_short: '%d %b %Y',
  date_formats_time: '%H:%M',
  // layout
  general_email_not_verified_1:
    'Your account is not verified. ' +
    'To verify it please click the link in the email. ' +
    "If you didn't receive the email click the following button:",
  general_email_not_verified_2: '',
  general_filter_by_group: 'Filter by %{group}.',
  general_filter_by_group_button: 'Select another group',
  general_email_not_button_resend: 'Resend confirmation email',
  general_resend_error_alert_subject: 'The email was not sent',
  general_resend_error_alert_description:
    'There was an error while sending the email.',
  general_resend_success_alert_subject: 'Success',
  general_resend_success_alert_description:
    "We've re-sent you the email. Please follow the instructions in the email",

  // drawer items
  drawer_label_home: 'Home',
  drawer_label_profile: 'Profile',
  drawer_label_logout: 'Logout',
  drawer_label_password: 'Change Password',
  drawer_label_profile_picture: 'Update Picture',
  drawer_label_invites: 'Invites',

  // drawer container
  drawer_edit_image_modal_edit_button: 'Change',

  // home tabs
  home_tab_matches: 'Matches',
  home_tab_players: 'Players',
  home_tab_groups: 'My Groups',

  // groups dd
  placeholder_dd_select_group: 'Select group',

  // headers
  header_title_home: 'Derby.Today',
  header_title_profile: 'Derby.Today',
  header_title_password: 'Derby.Today',
  header_group_invite: 'Invite new player',
  header_group_edit: 'Edit group',
  header_group_add: 'Create group',
  header_edit_profile_picture: 'Derby.Today',
  header_invites: 'My Invites',
  header_player: 'Player info',
  header_players: 'Players List',
  header_player_settings: 'Player Settings',
  header_match_add: 'Derby.Today',
  header_match_edit: 'Derby.Today',
  header_match_edit_teams: 'Derby.Today',
  header_match_edit_score: 'Derby.Today',
  header_match: 'Derby.Today',

  // player settings screen
  player_settings_save: 'Save',
  player_settings_kick_out: 'Kick out',
  player_settings_cancel: 'reset checkboxes',
  players_update_sett_err_alert_subject: 'Error',
  players_update_sett_err_alert_description: 'Error saving the settings',
  players_update_sett_success_alert_subject: 'Success',
  players_update_sett_success_alert_description:
    'The settings have been changed.',

  // player_kick_out_modal_confirm
  player_kick_out_modal_confirm:
    'Are you sure you want to kick out %{player} from %{group}?',
  player_kick_out_modal_ok: 'Yes',
  player_kick_out_modal_ok_progress: 'Kicking out',
  player_kick_out_modal_cancel: 'Cancel',
  players_kick_out_err_alert_subject: 'Eroare',
  players_kick_out_err_alert_description:
    'A aparut o eroare. Te rugam sa incerci mai tarziu',
  players_kick_out_success_alert_subject: 'Succes',
  players_kick_out_success_alert_description:
    'Jucatorul a fost dat afara din grup',

  // edit profile picture screen
  edit_profile_picture_label: 'Profile Picture',
  edit_profile_take: 'Take a picture',
  edit_profile_pick: 'Pick an image from camera roll',

  // auth screen:
  auth_sign_in_tab: 'Sign in',
  auth_sign_up_tab: 'Sign up',
  auth_forgot_password_label: 'Forgot your password?',
  auth_have_account_link: 'Do you have an account? Click here to sign in',
  auth_s_in_email_label: 'Email',
  auth_s_in_password_label: 'Password',
  auth_s_in_submit_label: 'Sign In',
  auth_s_in_alert_error_title: 'Error',
  auth_s_in_alert_error_description: 'Wrong user or password.',
  auth_s_up_first_name_label: 'First Name',
  auth_s_up_last_name_label: 'Last Name',
  auth_s_up_email_label: 'Email',
  auth_s_up_password_label: 'Password',
  auth_s_up_password_confirmation_label: 'Password Confirmation',
  auth_s_up_submit_label: 'Sign Up',
  auth_s_up_alert_error_title: 'Error',
  auth_s_up_alert_error_description: 'Please try again later.',
  auth_s_up_alert_success_title: 'Success',
  auth_s_up_alert_success_description: 'Successfully registered',
  auth_forgot_password_title: 'Password Reset',
  auth_fp_email_label: 'Email address',
  auth_fp_submit_label: 'Send',
  auth_fp_alert_error_title: 'Error',
  auth_fp_alert_error_description: 'Error sending the request',
  auth_fp_alert_success_title: 'Success',
  auth_fp_alert_success_description:
    'Successfully sent. Please check your email',

  // matches screen
  matches_screen_capacity: '%{count} players',
  matches_screen_minutes: '%{count} minutes',
  matches_screen_info: 'Match info:',
  matches_screen_created_by: 'Creat de:',
  matches_screen_label_upcoming: 'Upcoming',
  matches_screen_label_canceled: 'Anulat',
  matches_screen_ill_be_there: "I'll be there",
  matches_screen_not_this_time: 'Not this time',
  matches_screen_menu_edit: 'Edit match info',
  matches_screen_menu_delete: 'Delete match',
  matches_screen_set_score: 'Set match score',
  matches_screen_set_teams: 'Set the teams',
  matches_screen_change_score: 'Edit match score',
  matches_screen_confirmations_locked: 'Confirmations Locked',
  match_screen_playing_now: 'Playing now',
  matches_page_delete_match_modal_cancel: 'Cancel',
  matches_page_delete_match_modal_ok_progress: 'deleting',
  matches_page_delete_match_modal_ok: 'Delete',
  matches_page_delete_match_modal_confirm:
    'Are you sure you want to delete this match?',
  matches_screen_no_matches_in_group:
    'No match was created. After the group admin creates a match, you will be able to subscribe.',
  match_delete_error_alert_subject: 'Error',
  match_delete_error_alert_description: 'The match was not deleted.',
  match_delete_success_alert_subject: 'Success',
  match_delete_success_alert_description: 'The match has been deleted.',

  // match screen
  match_screen_subscribed_players: 'Subscribed players',
  match_team_title: 'Team',
  match_err_subscribe_alert_subject: 'Error',
  match_err_subscribe_alert_description:
    "There was an error. You didn't subscribe",
  match_err_unsubscribe_alert_subject: 'Error',
  match_err_unsubscribe_alert_description: 'There was an error unsubscribing.',
  matches_screen_subscribed: "You're subscribed",

  // players
  players_list_no_results: 'This group does not have any players',
  players_match_numbers: '%{matches} meciuri, %{wins} victorii, %{performance}',
  players_no_matches: 'no matches',
  players_player_settings: 'settings',

  // player
  player_screen_label_username: 'Username:',
  player_screen_label_date: 'Created at:',
  player_chart_not_available: 'Chart not available',
  player_screen_label_performance: 'Performance',
  player_screen_label_overview: 'Overview',

  // invite player screen
  invite_player_form_title: 'Invite a new player to join this group: %{group} ',
  invite_player_email_label: "Player's email address",
  invite_player_submit_label: 'Invite',

  // groups screen
  groups_context_menu_leave: 'Leave group',
  groups_context_menu_edit: 'Edit',
  groups_context_menu_delete: 'Delete',
  groups_context_menu_invite: 'Invite new player',
  groups_page_delete_group_modal_cancel: 'Cancel',
  groups_page_delete_group_modal_ok: 'Delete',
  groups_page_delete_group_modal_ok_progress: 'deleting',
  groups_page_delete_group_modal_confirm:
    'Are you sure you want to delete this group?',
  groups_page_leave_group_modal_cancel: 'Cancel',
  groups_page_leave_group_modal_ok_progress: 'leaving',
  groups_page_leave_group_modal_ok: 'Leave',
  groups_page_leave_group_modal_confirm:
    'Are you sure you want to leave the group?',
  dg_success_alert_description: 'The group was deleted',
  dg_success_alert_subject: 'Success',
  dg_error_alert_subject: 'Error',
  dg_error_alert_description: 'There was an error deleting the group',
  groups_created_by: 'Created by %{user}. %{users} players',
  groups_count_games: 'Matches: %{matches}',
  dg_not_deletable_error_alert_subject: 'Error',
  dg_not_deletable_error_alert_description:
    'At the moment you can not delete this group',
  leave_g_error_alert_subject: 'Error',
  leave_g_error_alert_description: 'Error leaving the group.',
  leave_g_success_alert_subject: 'Success',
  leave_g_success_alert_description: 'You left the group',
  invite_player_error_alert_subject: 'Error',
  invite_player_error_alert_description: 'Error sending the invitation.',
  invite_player_success_alert_subject: 'Success',
  invite_player_success_alert_description: 'You successfully invited the user',
  groups_page_share_group_label_info:
    'Copy the URL and send it to your friends',
  groups_page_share_group_cancel: 'Cancel',
  groups_page_share_group_copy: 'Copy',
  groups_no_results: "You're not part of any group",
  groups_select_cancel: 'Cancel',

  // invites list
  invites_invited_by: 'You have been invited by %{user} at %{date}',
  invites_page_reject_modal_cancel: 'Cancel',
  invites_page_reject_modal_ok_progress: 'rejecting...',
  invites_page_reject_modal_ok: 'Reject',
  invites_page_reject_modal_confirm:
    'Are you sure you want to reject this invite?',
  invites_accept_group_modal_cancel: 'Cancel',
  invites_accept_group_modal_ok_progress: 'accepting...',
  invites_accept_group_modal_ok: 'Accept',
  invites_accept_group_modal_confirm:
    'Are you sure you want to accept this invite?',
  invites_invited_by_details: 'Invite sent by',
  invites_group_name_details: 'Group Name',
  invites_accept_a_error_alert_subject: 'Error',
  invites_accept_a_error_alert_description:
    'There was an error accepting the invite',
  invites_accept_a_success_alert_subject: 'Success',
  invites_accept_a_success_alert_description: 'The invite has been accepted.',
  invites_reject_a_error_alert_subject: 'Error',
  invites_reject_a_error_alert_description: 'Could not reject the invite.',
  invites_reject_a_success_alert_subject: 'Success',
  invites_reject_a_success_alert_description: 'You rejected the invite',
  invites_list_no_results: 'You have no invitation.',

  // edit group screen
  eg_placeholder_group_name: 'Group name',
  eg_placeholder_short_description: 'Short description',
  eg_button_submit: 'Edit',
  eg_short_description_hint: 'Some description of the group (not mandatory)',
  eg_group_name_hint: 'Eg: Team Name, Organisation Name, Joe and Friends',
  eg_error_alert_subject: 'Error',
  eg_error_alert_description: 'There was an error editing the group info',
  eg_success_alert_subject: 'Success',
  eg_success_alert_description: 'Group info was updated.',
  eg_already_exists_error_alert_subject: 'Error',
  eg_already_exists_error_alert_description: 'This group name is already taken',
  eg_allow_share: 'Allow share',
  eg_allow_share_hint_false:
    'Change (ON), if you want to allow your friends to register via a shareble link',
  eg_allow_share_hint_true:
    "Change (OFF), if you DON'T want to allow your friends to register via a shareble link",

  // add group screen
  ag_placeholder_group_name: 'Group name',
  ag_group_name_hint: 'Eg: Team Name, Organisation Name, Joe and Friends',
  ag_placeholder_short_description: 'Short description',
  ag_short_description_hint: 'Some description of the group (not mandatory)',
  ag_button_submit: 'Create',
  ag_error_alert_subject: 'Error',
  ag_error_alert_description: 'Error creating the group',
  ag_already_exists_error_alert_subject: 'Error',
  ag_already_exists_error_alert_description: 'This group name is already taken',
  ag_success_alert_subject: 'Success',
  ag_success_alert_description: 'The group has been created.',
  ag_too_many_groups_error_alert_subject: 'Error',
  ag_too_many_groups_error_alert_description: 'Too many groups (max 5 allowed)',

  // profile screen
  profile_form_title: 'Update Profile',
  profile_placeholder_first_name: 'First Name',
  profile_placeholder_last_name: 'Last Name',
  profile_placeholder_email: 'Email',
  profile_placeholder_username: 'Username',
  profile_button_update: 'Update',
  profile_card_upload_profile_image: 'Profile Picture',
  profile_card_pick_an_image: 'Pick an image',
  profile_card_crop_modal_title: 'Pick an image',
  profile_card_crop_modal_submit: 'Upload',
  profile_placeholder_password: 'Password',
  profile_placeholder_password_confirmation: 'Password Confirmation',
  profile_button_update_password: 'Update Password',
  update_profile_err_alert_subject: 'Error',
  update_profile_err_alert_description:
    'Error updating the profile. Please try again later',
  update_password_err_alert_subject: 'Error',
  update_password_err_alert_description:
    'Error updating the password. Please try again later',
  update_password_success_alert_subject: 'Success',
  update_password_success_alert_description: 'Password updated.',
  password_form_title: 'Change your password',

  // match add screen
  match_add_group_name_label: 'Select group',
  match_add_players_label: 'Number of players',
  match_add_minutes_label: 'Duration',
  match_add_select_group_label: 'Choose option',
  match_add_button_label: 'Create',
  match_add_location_label: 'Location',
  match_add_select_location_label: 'Choose option',
  match_add_select_date: 'Select match date',
  match_add_form_title: 'New match form',
  match_add_err_alert_subject: 'Error',
  match_add_err_alert_description: 'Please try again later',
  match_add_success_alert_subject: 'Success',
  match_add_success_alert_description: 'The match has been added.',

  // match edit screen
  match_edit_form_title: 'Update match info',
  match_edit_score_form_title: 'Update score',
  match_edit_teams_form_title: 'Set the teams',
  match_edit_button_label: 'Edit',
  match_edit_score_teams_not_set:
    'Can not add the score. Please set the teams first.',
};

i18n.translations = {
  en,
  'ro-RO': ro,
  ro,
};
