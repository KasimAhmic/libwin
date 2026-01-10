#include "common.hpp"

Napi::Value Common::ptr(const Napi::CallbackInfo &info) {
  QB_CHECK_ARG_LEN(1);

  const Napi::Value arg = info[0];

  if (arg.IsBuffer()) {
    const Napi::Buffer<uint8_t> buffer = arg.As<Napi::Buffer<uint8_t>>();
    const uintptr_t ptrValue = reinterpret_cast<uintptr_t>(buffer.Data());

    return Napi::BigInt::New(info.Env(), ptrValue);
  }

  if (arg.IsTypedArray()) {
    const Napi::TypedArray typedArray = arg.As<Napi::TypedArray>();
    Napi::ArrayBuffer arrayBuffer = typedArray.ArrayBuffer();

    const uint8_t *base = static_cast<const uint8_t *>(arrayBuffer.Data());
    const size_t offset = typedArray.ByteOffset();
    const uintptr_t ptrValue = reinterpret_cast<uintptr_t>(base + offset);

    return Napi::BigInt::New(info.Env(), ptrValue);
  }

  // TODO: DataView? ArrayBuffer?

  Napi::TypeError::New(info.Env(), "Expected a Buffer or TypedArray").ThrowAsJavaScriptException();
  return info.Env().Undefined();
}
