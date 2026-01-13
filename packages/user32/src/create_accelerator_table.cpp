#include "user32.hpp"

Napi::Value User32::CreateAcceleratorTableW(const Napi::CallbackInfo &info) {
  const QB_ARG(paccel, qb::ReadRequiredArray(info, 0));
  const QB_ARG(cAccel, qb::ReadRequiredUint32(info, 1));

  std::vector<ACCEL> accelBuffer{};

  for (uint32_t i = 0; i < cAccel; ++i) {
    const Napi::Object accelObject = qb::ReadRequiredObject(paccel, i);

    ACCEL accelEntry{};
    accelEntry.fVirt = qb::ReadRequiredUint8(accelObject, "fVirt");
    accelEntry.key = qb::ReadRequiredUint16(accelObject, "key");
    accelEntry.cmd = qb::ReadRequiredUint16(accelObject, "cmd");

    accelBuffer.push_back(accelEntry);
  }

  const HACCEL hAccel = ::CreateAcceleratorTableW(accelBuffer.data(), cAccel);

  return qb::HandleToBigInt(info, hAccel);
}

Napi::Value User32::CreateAcceleratorTableA(const Napi::CallbackInfo &info) {
  const QB_ARG(paccel, qb::ReadRequiredArray(info, 0));
  const QB_ARG(cAccel, qb::ReadRequiredUint32(info, 1));

  std::vector<ACCEL> accelBuffer{};

  for (uint32_t i = 0; i < cAccel; ++i) {
    const Napi::Object accelObject = qb::ReadRequiredObject(paccel, i);

    ACCEL accelEntry{};
    accelEntry.fVirt = qb::ReadRequiredUint8(accelObject, "fVirt");
    accelEntry.key = qb::ReadRequiredUint16(accelObject, "key");
    accelEntry.cmd = qb::ReadRequiredUint16(accelObject, "cmd");

    accelBuffer.push_back(accelEntry);
  }

  const HACCEL hAccel = ::CreateAcceleratorTableA(accelBuffer.data(), cAccel);

  return qb::HandleToBigInt(info, hAccel);
}
