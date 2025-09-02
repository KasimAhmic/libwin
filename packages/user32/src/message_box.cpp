#include "user32.hpp"

static thread_local std::unique_ptr<CallbackHandler<Napi::Value>> msgBoxCallbackHandler = nullptr;

static void CALLBACK MsgBoxThunk(const LPHELPINFO lpHelpInfo) {
  if (msgBoxCallbackHandler) {
    Napi::Env env = msgBoxCallbackHandler->GetEnv();

    Napi::Object point = Napi::Object::New(env);
    point.Set("x", Napi::Number::New(env, lpHelpInfo->MousePos.x));
    point.Set("y", Napi::Number::New(env, lpHelpInfo->MousePos.y));

    Napi::Object obj = Napi::Object::New(env);
    obj.Set("iContextType", Napi::Number::New(env, lpHelpInfo->iContextType));
    obj.Set("iCtrlId", Napi::Number::New(env, lpHelpInfo->iCtrlId));
    obj.Set("dwContextId", Napi::Number::New(env, lpHelpInfo->dwContextId));
    obj.Set("hItemHandle", Napi::BigInt::New(env, reinterpret_cast<uintptr_t>(lpHelpInfo->hItemHandle)));
    obj.Set("MousePos", point);

    msgBoxCallbackHandler->Invoke(obj);
  }
}

Napi::Value User32::MessageBoxW(const Napi::CallbackInfo &info) {
  const QB_ARG(hWnd, qb::ReadRequiredHandle<HWND>(info, 0));
  const QB_ARG(lpText, qb::ReadRequiredWideString(info, 1));
  const QB_ARG(lpCaption, qb::ReadRequiredWideString(info, 2));
  const QB_ARG(uType, qb::ReadRequiredUint32(info, 3));

  const int result = ::MessageBoxW(hWnd, lpText.c_str(), lpCaption.c_str(), uType);

  return Napi::Number::New(info.Env(), result);
}

Napi::Value User32::MessageBoxA(const Napi::CallbackInfo &info) {
  const QB_ARG(hWnd, qb::ReadRequiredHandle<HWND>(info, 0));
  const QB_ARG(lpText, qb::ReadRequiredString(info, 1));
  const QB_ARG(lpCaption, qb::ReadRequiredString(info, 2));
  const QB_ARG(uType, qb::ReadRequiredUint32(info, 3));

  const int result = ::MessageBoxA(hWnd, lpText.c_str(), lpCaption.c_str(), uType);

  return Napi::Number::New(info.Env(), result);
}

Napi::Value User32::MessageBoxExW(const Napi::CallbackInfo &info) {
  const QB_ARG(hWnd, qb::ReadRequiredHandle<HWND>(info, 0));
  const QB_ARG(lpText, qb::ReadRequiredWideString(info, 1));
  const QB_ARG(lpCaption, qb::ReadRequiredWideString(info, 2));
  const QB_ARG(uType, qb::ReadRequiredUint32(info, 3));
  const QB_ARG(wLanguageId, qb::ReadRequiredUint16(info, 4));

  const int result = ::MessageBoxExW(hWnd, lpText.c_str(), lpCaption.c_str(), uType, wLanguageId);

  return Napi::Number::New(info.Env(), result);
}

Napi::Value User32::MessageBoxExA(const Napi::CallbackInfo &info) {
  const QB_ARG(hWnd, qb::ReadRequiredHandle<HWND>(info, 0));
  const QB_ARG(lpText, qb::ReadRequiredString(info, 1));
  const QB_ARG(lpCaption, qb::ReadRequiredString(info, 2));
  const QB_ARG(uType, qb::ReadRequiredUint32(info, 3));
  const QB_ARG(wLanguageId, qb::ReadRequiredUint16(info, 4));

  const int result = ::MessageBoxExA(hWnd, lpText.c_str(), lpCaption.c_str(), uType, wLanguageId);

  return Napi::Number::New(info.Env(), result);
}

Napi::Value User32::MessageBoxIndirectW(const Napi::CallbackInfo &info) {
  const Napi::Env env = info.Env();

  const QB_ARG(params, qb::ReadRequiredObject(info, 0));

  const QB_ARG(cbSize, qb::ReadRequiredUint32(params, "cbSize"));
  const QB_ARG(hwndOwner, qb::ReadOptionalUint64(params, "hwndOwner"));
  const QB_ARG(hInstance, qb::ReadOptionalUint64(params, "hInstance"));
  const QB_ARG(lpszText, qb::ReadRequiredWideString(params, "lpszText"));
  const QB_ARG(lpszCaption, qb::ReadOptionalWideString(params, "lpszCaption"));
  const QB_ARG(dwStyle, qb::ReadRequiredUint32(params, "dwStyle"));
  const QB_ARG(lpszIcon, qb::ReadOptionalWideString(params, "lpszIcon"));
  const QB_ARG(dwContextHelpId, qb::ReadOptionalUint64(params, "dwContextHelpId"));
  const QB_ARG(lpfnMsgBoxCallback, qb::ReadOptionalFunction(params, "lpfnMsgBoxCallback"));
  const QB_ARG(dwLanguageId, qb::ReadOptionalInt32(params, "dwLanguageId"));

  MSGBOXPARAMSW msgBoxParams{};

  msgBoxParams.cbSize = cbSize;
  msgBoxParams.lpszText = lpszText.c_str();
  msgBoxParams.dwStyle = dwStyle;
  QB_SET(msgBoxParams, hwndOwner, reinterpret_cast<HWND>(hwndOwner.value()));
  QB_SET(msgBoxParams, hInstance, reinterpret_cast<HINSTANCE>(hInstance.value()));
  QB_SET(msgBoxParams, lpszCaption, lpszCaption->c_str());
  QB_SET(msgBoxParams, lpszIcon, lpszIcon->c_str());
  QB_SET(msgBoxParams, dwContextHelpId, dwContextHelpId.value());
  QB_SET(msgBoxParams, dwLanguageId, dwLanguageId.value());

  if (lpfnMsgBoxCallback.has_value()) {
    msgBoxCallbackHandler = std::make_unique<CallbackHandler<Napi::Value>>(env, lpfnMsgBoxCallback.value());

    msgBoxParams.lpfnMsgBoxCallback = MsgBoxThunk;
  }

  const int result = ::MessageBoxIndirectW(&msgBoxParams);

  return Napi::Number::New(env, result);
}

Napi::Value User32::MessageBoxIndirectA(const Napi::CallbackInfo &info) {
  const Napi::Env env = info.Env();

  const QB_ARG(params, qb::ReadRequiredObject(info, 0));

  const QB_ARG(cbSize, qb::ReadRequiredUint32(params, "cbSize"));
  const QB_ARG(hwndOwner, qb::ReadOptionalUint64(params, "hwndOwner"));
  const QB_ARG(hInstance, qb::ReadOptionalUint64(params, "hInstance"));
  const QB_ARG(lpszText, qb::ReadRequiredString(params, "lpszText"));
  const QB_ARG(lpszCaption, qb::ReadOptionalString(params, "lpszCaption"));
  const QB_ARG(dwStyle, qb::ReadRequiredUint32(params, "dwStyle"));
  const QB_ARG(lpszIcon, qb::ReadOptionalString(params, "lpszIcon"));
  const QB_ARG(dwContextHelpId, qb::ReadOptionalUint64(params, "dwContextHelpId"));
  const QB_ARG(lpfnMsgBoxCallback, qb::ReadOptionalFunction(params, "lpfnMsgBoxCallback"));
  const QB_ARG(dwLanguageId, qb::ReadOptionalInt32(params, "dwLanguageId"));

  MSGBOXPARAMSA msgBoxParams{};

  msgBoxParams.cbSize = cbSize;
  msgBoxParams.lpszText = lpszText.c_str();
  msgBoxParams.dwStyle = dwStyle;
  QB_SET(msgBoxParams, hwndOwner, reinterpret_cast<HWND>(hwndOwner.value()));
  QB_SET(msgBoxParams, hInstance, reinterpret_cast<HINSTANCE>(hInstance.value()));
  QB_SET(msgBoxParams, lpszCaption, lpszCaption->c_str());
  QB_SET(msgBoxParams, lpszIcon, lpszIcon->c_str());
  QB_SET(msgBoxParams, dwContextHelpId, dwContextHelpId.value());
  QB_SET(msgBoxParams, dwLanguageId, dwLanguageId.value());

  if (lpfnMsgBoxCallback.has_value()) {
    msgBoxCallbackHandler = std::make_unique<CallbackHandler<Napi::Value>>(env, lpfnMsgBoxCallback.value());
    msgBoxParams.lpfnMsgBoxCallback = MsgBoxThunk;
  }

  const int result = ::MessageBoxIndirectA(&msgBoxParams);

  return Napi::Number::New(env, result);
}
