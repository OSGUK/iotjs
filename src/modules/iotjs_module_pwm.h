/* Copyright 2016-present Samsung Electronics Co., Ltd. and other contributors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


#ifndef IOTJS_MODULE_PWM_H
#define IOTJS_MODULE_PWM_H

#include "iotjs_def.h"
#include "iotjs_reqwrap.h"

#if defined(__TIZENRT__)
#include <iotbus_pwm.h>
#include <stdint.h>
#endif


typedef enum {
  kPwmOpClose,
  kPwmOpOpen,
  kPwmOpSetDutyCycle,
  kPwmOpSetEnable,
  kPwmOpSetFrequency,
  kPwmOpSetPeriod
} PwmOp;


typedef struct {
  bool result;
  PwmOp op;
} iotjs_pwm_reqdata_t;

// Forward declaration of platform data. These are only used by platform code.
// Generic PWM module never dereferences platform data pointer.
typedef struct iotjs_pwm_platform_data_s iotjs_pwm_platform_data_t;

typedef struct {
  jerry_value_t jobject;
  iotjs_pwm_platform_data_t* platform_data;

  uint32_t pin;
  double duty_cycle;
  double period;
  bool enable;
} IOTJS_VALIDATED_STRUCT(iotjs_pwm_t);


typedef struct {
  iotjs_reqwrap_t reqwrap;
  uv_work_t req;
  iotjs_pwm_reqdata_t req_data;
  iotjs_pwm_t* pwm_data;
} IOTJS_VALIDATED_STRUCT(iotjs_pwm_reqwrap_t);


#define THIS iotjs_pwm_reqwrap_t* pwm_reqwrap

iotjs_pwm_reqwrap_t* iotjs_pwm_reqwrap_from_request(uv_work_t* req);
iotjs_pwm_reqdata_t* iotjs_pwm_reqwrap_data(THIS);
iotjs_pwm_t* iotjs_pwm_instance_from_reqwrap(THIS);

#undef THIS

jerry_value_t iotjs_pwm_set_platform_config(iotjs_pwm_t* pwm,
                                            const jerry_value_t jconfig);
bool iotjs_pwm_open(iotjs_pwm_t* pwm);
bool iotjs_pwm_set_period(iotjs_pwm_t* pwm);
bool iotjs_pwm_set_dutycycle(iotjs_pwm_t* pwm);
bool iotjs_pwm_set_enable(iotjs_pwm_t* pwm);
bool iotjs_pwm_close(iotjs_pwm_t* pwm);

// Platform-related functions; they are implemented
// by platform code (i.e.: linux, nuttx, tizen).
void iotjs_pwm_create_platform_data(iotjs_pwm_t* pwm);
void iotjs_pwm_destroy_platform_data(iotjs_pwm_platform_data_t* platform_data);

#endif /* IOTJS_MODULE_PWM_H */
