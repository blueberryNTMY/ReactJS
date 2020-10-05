import Cookies from "js-cookie";
import { PATH } from "./routes";

export const ADMIN = "admin"; // Админ
export const OPERATOR = "call_center_operator"; // Окно оператора
export const SUPERVISOR = "supervisor"; // Окно оператора
export const SELECTION_COMMITTEE = "selection_committee"; // Приемная комиссия
export const PARTNERS = "partners"; // Партнеры
export const TRANSFERS_AND_RECOVERY = "transfers_and_recovery"; // Переводы и восстановления
export const PUBLISHED_PROGRAMS = "published_programs"; // Публикация программ
export const OLYMPICS = "olympics"; // Олимпиады
export const BASE = "base"; // Базовые справочники
export const CONTACTS = "contacts"; // Контакты

export const editProtected = [OPERATOR];

export const rolesWithFeedback = [OPERATOR];
export const pagesWithFeedback = [PATH.contacts.index, PATH.faq.index + "/all"];

export const showProtectContent = role => !editProtected.includes(role);
export const showRoleFeedback = role => rolesWithFeedback.includes(role);
export const showPageFeedback = path => pagesWithFeedback.includes(path);

export const getRole = () => Cookies.get("role");

/*
* Вот список всех ролей
1. Admin - Администратор, роль - admin
Логин - admin@admin.com
Пароль - admin

2. Operator - Оператор колл центра, роль - call_center_operator
Логин - operator@operator.com
Пароль - operator

3. Selection - Приемная комиссия, роль - selection_committee
Логин - selection@selection.com
Пароль - selection

4. Transfer - Переводы и восстановления, роль - transfers_and_recovery
Логин - transfer@transfer.com
Пароль - transfer

5. Program - Публикация программ, роль - published_programs
Логин - program@program.com
Пароль - program

6. Olympic - Олимпиады, роль - olympics
Логин - olympic@olympic.com
Пароль - olympic

7. Base - Базовые справочники, роль - base
Логин - base@base.com
Пароль - base

8. Partner - Партнеры, роль - partners
Логин - partner@partner.com
Пароль - partner

9. Supervisor - Супервайзер, роль - supervisor
Логин - supervisor@supervisor.com
Пароль - supervisor

10. Contacts - Контакты, роль - contacts
Логин - contacts@contacts.com
Пароль - contacts
* */
