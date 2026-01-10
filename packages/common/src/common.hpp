#pragma once

#include <napi.h>

#include "../include/quickbind.hpp";

namespace Common {
  Napi::Value ptr(const Napi::CallbackInfo &info);
}
