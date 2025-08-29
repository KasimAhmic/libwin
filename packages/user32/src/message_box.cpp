#include "user32.hpp"

static thread_local std::unique_ptr<CallbackHandler> msgBoxCallbackHandler = nullptr;

static void CALLBACK MsgBoxThunk(const LPHELPINFO lpHelpInfo)
{
  if (msgBoxCallbackHandler)
  {
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

Napi::Value User32::MessageBoxW(const Napi::CallbackInfo &info)
{
  const ARG(hWnd, ReadArgAsHandle<HWND>(info, 0));
  const ARG(lpText, ReadArgAsWideString(info, 1));
  const ARG(lpCaption, ReadArgAsWideString(info, 2));
  const ARG(uType, ReadArgAsUINT(info, 3));

  const int result = ::MessageBoxW(hWnd, lpText.c_str(), lpCaption.c_str(), uType);

  return Napi::Number::New(info.Env(), result);
}

Napi::Value User32::MessageBoxA(const Napi::CallbackInfo &info)
{
  const ARG(hWnd, ReadArgAsHandle<HWND>(info, 0));
  const ARG(lpText, ReadArgAsString(info, 1));
  const ARG(lpCaption, ReadArgAsString(info, 2));
  const ARG(uType, ReadArgAsUINT(info, 3));

  const int result = ::MessageBoxA(hWnd, lpText.c_str(), lpCaption.c_str(), uType);

  return Napi::Number::New(info.Env(), result);
}

Napi::Value User32::MessageBoxExW(const Napi::CallbackInfo &info)
{
  const ARG(hWnd, ReadArgAsHandle<HWND>(info, 0));
  const ARG(lpText, ReadArgAsWideString(info, 1));
  const ARG(lpCaption, ReadArgAsWideString(info, 2));
  const ARG(uType, ReadArgAsUINT(info, 3));
  const ARG(wLanguageId, ReadArgAsWORD(info, 4));

  const int result = ::MessageBoxExW(hWnd, lpText.c_str(), lpCaption.c_str(), uType, wLanguageId);

  return Napi::Number::New(info.Env(), result);
}

Napi::Value User32::MessageBoxExA(const Napi::CallbackInfo &info)
{
  const ARG(hWnd, ReadArgAsHandle<HWND>(info, 0));
  const ARG(lpText, ReadArgAsString(info, 1));
  const ARG(lpCaption, ReadArgAsString(info, 2));
  const ARG(uType, ReadArgAsUINT(info, 3));
  const ARG(wLanguageId, ReadArgAsWORD(info, 4));

  const int result = ::MessageBoxExA(hWnd, lpText.c_str(), lpCaption.c_str(), uType, wLanguageId);

  return Napi::Number::New(info.Env(), result);
}

Napi::Value User32::MessageBoxIndirectW(const Napi::CallbackInfo &info)
{
  const Napi::Env env = info.Env();

  const ARG(params, ReadArgAsObject(info, 0));

  const ARG(cbSize, ReadPropertyAsUint32(params, "cbSize"));
  const ARG(hwndOwner, ReadPropertyAsUint64(params, "hwndOwner", true));
  const ARG(hInstance, ReadPropertyAsUint64(params, "hInstance", true));
  const ARG(lpszText, ReadPropertyAsWideString(params, "lpszText"));
  const ARG(lpszCaption, ReadPropertyAsWideString(params, "lpszCaption", true));
  const ARG(dwStyle, ReadPropertyAsUint32(params, "dwStyle"));
  const ARG(lpszIcon, ReadPropertyAsWideString(params, "lpszIcon", true));
  const ARG(dwContextHelpId, ReadPropertyAsUint64(params, "dwContextHelpId", true));
  const ARG(lpfnMsgBoxCallback, ReadPropertyAsFunction(params, "lpfnMsgBoxCallback", true));
  const ARG(dwLanguageId, ReadPropertyAsUint32(params, "dwLanguageId", true));

  MSGBOXPARAMSW msgBoxParams{};

  SET(msgBoxParams, cbSize, cbSize.value());
  SET(msgBoxParams, hwndOwner, reinterpret_cast<HWND>(hwndOwner.value()));
  SET(msgBoxParams, hInstance, reinterpret_cast<HINSTANCE>(hInstance.value()));
  SET(msgBoxParams, lpszText, lpszText->c_str());
  SET(msgBoxParams, lpszCaption, lpszCaption->c_str());
  SET(msgBoxParams, dwStyle, dwStyle.value());
  SET(msgBoxParams, lpszIcon, lpszIcon->c_str());
  SET(msgBoxParams, dwContextHelpId, dwContextHelpId.value());
  SET(msgBoxParams, dwLanguageId, dwLanguageId.value());

  if (lpfnMsgBoxCallback.has_value())
  {
    msgBoxCallbackHandler = std::make_unique<CallbackHandler>(env, lpfnMsgBoxCallback.value());
    msgBoxParams.lpfnMsgBoxCallback = MsgBoxThunk;
  }

  const int result = ::MessageBoxIndirectW(&msgBoxParams);

  return Napi::Number::New(env, result);
}

Napi::Value User32::MessageBoxIndirectA(const Napi::CallbackInfo &info)
{
  const Napi::Env env = info.Env();

  const ARG(params, ReadArgAsObject(info, 0));

  const ARG(cbSize, ReadPropertyAsUint32(params, "cbSize"));
  const ARG(hwndOwner, ReadPropertyAsUint64(params, "hwndOwner", true));
  const ARG(hInstance, ReadPropertyAsUint64(params, "hInstance", true));
  const ARG(lpszText, ReadPropertyAsString(params, "lpszText"));
  const ARG(lpszCaption, ReadPropertyAsString(params, "lpszCaption", true));
  const ARG(dwStyle, ReadPropertyAsUint32(params, "dwStyle"));
  const ARG(lpszIcon, ReadPropertyAsString(params, "lpszIcon", true));
  const ARG(dwContextHelpId, ReadPropertyAsUint64(params, "dwContextHelpId", true));
  const ARG(lpfnMsgBoxCallback, ReadPropertyAsFunction(params, "lpfnMsgBoxCallback", true));
  const ARG(dwLanguageId, ReadPropertyAsUint32(params, "dwLanguageId", true));

  MSGBOXPARAMSA msgBoxParams{};

  SET(msgBoxParams, cbSize, cbSize.value());
  SET(msgBoxParams, hwndOwner, reinterpret_cast<HWND>(hwndOwner.value()));
  SET(msgBoxParams, hInstance, reinterpret_cast<HINSTANCE>(hInstance.value()));
  SET(msgBoxParams, lpszText, lpszText->c_str());
  SET(msgBoxParams, lpszCaption, lpszCaption->c_str());
  SET(msgBoxParams, dwStyle, dwStyle.value());
  SET(msgBoxParams, lpszIcon, lpszIcon->c_str());
  SET(msgBoxParams, dwContextHelpId, dwContextHelpId.value());
  SET(msgBoxParams, dwLanguageId, dwLanguageId.value());

  if (lpfnMsgBoxCallback.has_value())
  {
    msgBoxCallbackHandler = std::make_unique<CallbackHandler>(env, lpfnMsgBoxCallback.value());
    msgBoxParams.lpfnMsgBoxCallback = MsgBoxThunk;
  }

  const int result = ::MessageBoxIndirectA(&msgBoxParams);

  return Napi::Number::New(env, result);
}
