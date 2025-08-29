#include "user32.hpp"

Napi::Value User32::AppendMenuA(const Napi::CallbackInfo &info) {};

Napi::Value User32::AppendMenuW(const Napi::CallbackInfo &info) {};

Napi::Value User32::CalcMenuBar(const Napi::CallbackInfo &info) {};

Napi::Value User32::ChangeMenuA(const Napi::CallbackInfo &info) {};

Napi::Value User32::ChangeMenuW(const Napi::CallbackInfo &info) {};

Napi::Value User32::CheckMenuItem(const Napi::CallbackInfo &info) {};

Napi::Value User32::CheckMenuRadioItem(const Napi::CallbackInfo &info) {};

Napi::Value User32::CreateMenu(const Napi::CallbackInfo &info)
{
  const HMENU hMenu = ::CreateMenu();

  return HandleToBigInt(info, hMenu);
};

Napi::Value User32::CreatePopupMenu(const Napi::CallbackInfo &info) {};

Napi::Value User32::DeleteMenu(const Napi::CallbackInfo &info) {};

Napi::Value User32::DestroyMenu(const Napi::CallbackInfo &info)
{
  const ARG(hMenu, ReadArgAsHandle<HMENU>(info, 0));

  const BOOL result = ::DestroyMenu(hMenu);

  return Napi::Boolean::New(info.Env(), result);
};

Napi::Value User32::DrawMenuBar(const Napi::CallbackInfo &info) {};

Napi::Value User32::DrawMenuBarTemp(const Napi::CallbackInfo &info) {};

Napi::Value User32::EnableMenuItem(const Napi::CallbackInfo &info) {};

Napi::Value User32::EndMenu(const Napi::CallbackInfo &info) {};

Napi::Value User32::GetMenu(const Napi::CallbackInfo &info)
{
  const ARG(hWnd, ReadArgAsHandle<HWND>(info, 0));

  const HMENU hMenu = ::GetMenu(hWnd);

  return HandleToBigInt(info, hMenu);
};

Napi::Value User32::GetMenuBarInfo(const Napi::CallbackInfo &info) {};

Napi::Value User32::GetMenuCheckMarkDimensions(const Napi::CallbackInfo &info) {};

Napi::Value User32::GetMenuContextHelpId(const Napi::CallbackInfo &info) {};

Napi::Value User32::GetMenuDefaultItem(const Napi::CallbackInfo &info) {};

Napi::Value User32::GetMenuInfo(const Napi::CallbackInfo &info) {};

Napi::Value User32::GetMenuItemCount(const Napi::CallbackInfo &info) {};

Napi::Value User32::GetMenuItemID(const Napi::CallbackInfo &info) {};

Napi::Value User32::GetMenuItemInfoA(const Napi::CallbackInfo &info) {};

Napi::Value User32::GetMenuItemInfoW(const Napi::CallbackInfo &info) {};

Napi::Value User32::GetMenuItemRect(const Napi::CallbackInfo &info) {};

Napi::Value User32::GetMenuState(const Napi::CallbackInfo &info) {};

Napi::Value User32::GetMenuStringA(const Napi::CallbackInfo &info) {};

Napi::Value User32::GetMenuStringW(const Napi::CallbackInfo &info) {};

Napi::Value User32::GetSubMenu(const Napi::CallbackInfo &info) {};

Napi::Value User32::GetSystemMenu(const Napi::CallbackInfo &info) {};

Napi::Value User32::HiliteMenuItem(const Napi::CallbackInfo &info) {};

Napi::Value User32::InsertMenuA(const Napi::CallbackInfo &info) {};

Napi::Value User32::InsertMenuItemA(const Napi::CallbackInfo &info) {};

Napi::Value User32::InsertMenuItemW(const Napi::CallbackInfo &info) {};

Napi::Value User32::InsertMenuW(const Napi::CallbackInfo &info) {};

Napi::Value User32::IsMenu(const Napi::CallbackInfo &info) {};

Napi::Value User32::LoadMenuA(const Napi::CallbackInfo &info) {};

Napi::Value User32::LoadMenuIndirectA(const Napi::CallbackInfo &info) {};

Napi::Value User32::LoadMenuIndirectW(const Napi::CallbackInfo &info) {};

Napi::Value User32::LoadMenuW(const Napi::CallbackInfo &info) {};

Napi::Value User32::MenuItemFromPoint(const Napi::CallbackInfo &info) {};

Napi::Value User32::MenuWindowProcA(const Napi::CallbackInfo &info) {};

Napi::Value User32::MenuWindowProcW(const Napi::CallbackInfo &info) {};

Napi::Value User32::ModifyMenuA(const Napi::CallbackInfo &info) {};

Napi::Value User32::ModifyMenuW(const Napi::CallbackInfo &info) {};

Napi::Value User32::PaintMenuBar(const Napi::CallbackInfo &info) {};

Napi::Value User32::RemoveMenu(const Napi::CallbackInfo &info) {};

Napi::Value User32::SetMenu(const Napi::CallbackInfo &info) {};

Napi::Value User32::SetMenuContextHelpId(const Napi::CallbackInfo &info) {};

Napi::Value User32::SetMenuDefaultItem(const Napi::CallbackInfo &info) {};

Napi::Value User32::SetMenuInfo(const Napi::CallbackInfo &info) {};

Napi::Value User32::SetMenuItemBitmaps(const Napi::CallbackInfo &info) {};

Napi::Value User32::SetMenuItemInfoA(const Napi::CallbackInfo &info) {};

Napi::Value User32::SetMenuItemInfoW(const Napi::CallbackInfo &info) {};

Napi::Value User32::SetSystemMenu(const Napi::CallbackInfo &info) {};

Napi::Value User32::TrackPopupMenu(const Napi::CallbackInfo &info) {};

Napi::Value User32::TrackPopupMenuEx(const Napi::CallbackInfo &info) {};
