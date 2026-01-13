#include "user32.hpp"

Napi::Value User32::TranslateAcceleratorW(const Napi::CallbackInfo &info) {
  const QB_ARG(hWnd, qb::ReadRequiredHandle<HWND>(info, 0));
  const QB_ARG(hAccTable, qb::ReadRequiredHandle<HACCEL>(info, 1));
  const QB_ARG(lpMsg, qb::ReadRequiredObject(info, 2));

  MSG msg{};

  msg.hwnd = qb::ReadRequiredHandle<HWND>(lpMsg, "hwnd");
  msg.message = qb::ReadRequiredUint32(lpMsg, "message");
  msg.wParam = static_cast<WPARAM>(qb::ReadRequiredUintPointer(lpMsg, "wParam"));
  msg.lParam = static_cast<LPARAM>(qb::ReadRequiredIntPointer(lpMsg, "lParam"));
  msg.time = qb::ReadRequiredUint32(lpMsg, "time");

  const QB_ARG(ptObj, qb::ReadRequiredObject(lpMsg, "pt"));
  msg.pt.x = qb::ReadRequiredInt32(ptObj, "x");
  msg.pt.y = qb::ReadRequiredInt32(ptObj, "y");

  const int result = ::TranslateAcceleratorW(hWnd, hAccTable, &msg);

  return Napi::Number::New(info.Env(), result);
}

Napi::Value User32::TranslateAcceleratorA(const Napi::CallbackInfo &info) {
  const QB_ARG(hWnd, qb::ReadRequiredHandle<HWND>(info, 0));
  const QB_ARG(hAccTable, qb::ReadRequiredHandle<HACCEL>(info, 1));
  const QB_ARG(lpMsg, qb::ReadRequiredObject(info, 2));

  MSG msg{};

  msg.hwnd = qb::ReadRequiredHandle<HWND>(lpMsg, "hwnd");
  msg.message = qb::ReadRequiredUint32(lpMsg, "message");
  msg.wParam = static_cast<WPARAM>(qb::ReadRequiredUintPointer(lpMsg, "wParam"));
  msg.lParam = static_cast<LPARAM>(qb::ReadRequiredIntPointer(lpMsg, "lParam"));
  msg.time = qb::ReadRequiredUint32(lpMsg, "time");

  const QB_ARG(ptObj, qb::ReadRequiredObject(lpMsg, "pt"));
  msg.pt.x = qb::ReadRequiredInt32(ptObj, "x");
  msg.pt.y = qb::ReadRequiredInt32(ptObj, "y");

  const int result = ::TranslateAcceleratorA(hWnd, hAccTable, &msg);

  return Napi::Number::New(info.Env(), result);
}
