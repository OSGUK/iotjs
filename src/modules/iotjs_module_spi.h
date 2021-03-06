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


#ifndef IOTJS_MODULE_SPI_H
#define IOTJS_MODULE_SPI_H

#include "iotjs_def.h"
#include "iotjs_module_buffer.h"
#include "iotjs_reqwrap.h"

#if defined(__TIZENRT__)
#include <iotbus_spi.h>
#include <tinyara/config.h>
#endif


#if defined(__NUTTX__)
#include <nuttx/spi/spi.h>
#endif

typedef enum {
  kSpiOpClose,
  kSpiOpOpen,
  kSpiOpTransferArray,
  kSpiOpTransferBuffer
} SpiOp;

typedef enum {
  kSpiMode_0,
  kSpiMode_1,
  kSpiMode_2,
  kSpiMode_3,
  __kSpiModeMax
} SpiMode;

typedef enum { kSpiCsNone, kSpiCsHigh, __kSpiCsMax } SpiChipSelect;

typedef enum { kSpiOrderMsb, kSpiOrderLsb, __kSpiOrderMax } SpiOrder;

// Forward declaration of platform data. These are only used by platform code.
// Generic SPI module never dereferences platform data pointer.
typedef struct iotjs_spi_platform_data_s iotjs_spi_platform_data_t;
// This SPI class provides interfaces for SPI operation.
typedef struct {
  jerry_value_t jobject;
  iotjs_spi_platform_data_t* platform_data;

  SpiMode mode;
  SpiChipSelect chip_select;
  SpiOrder bit_order;
  uint8_t bits_per_word;
  uint16_t delay;
  uint32_t max_speed;
  bool loopback;

  // SPI buffer
  char* tx_buf_data;
  char* rx_buf_data;
  uint8_t buf_len;
} IOTJS_VALIDATED_STRUCT(iotjs_spi_t);

typedef struct {
  bool result;
  SpiOp op;
} iotjs_spi_reqdata_t;

typedef struct {
  iotjs_reqwrap_t reqwrap;
  uv_work_t req;
  iotjs_spi_reqdata_t req_data;
  iotjs_spi_t* spi_data;
} IOTJS_VALIDATED_STRUCT(iotjs_spi_reqwrap_t);


#define THIS iotjs_spi_reqwrap_t* spi_reqwrap
iotjs_spi_reqwrap_t* iotjs_spi_reqwrap_from_request(uv_work_t* req);
iotjs_spi_reqdata_t* iotjs_spi_reqwrap_data(THIS);
iotjs_spi_t* iotjs_spi_instance_from_reqwrap(THIS);
#undef THIS


jerry_value_t iotjs_spi_set_platform_config(iotjs_spi_t* spi,
                                            const jerry_value_t jconfig);
bool iotjs_spi_open(iotjs_spi_t* spi);
bool iotjs_spi_transfer(iotjs_spi_t* spi);
bool iotjs_spi_close(iotjs_spi_t* spi);

// Platform-related functions; they are implemented
// by platform code (i.e.: linux, nuttx, tizen).
void iotjs_spi_create_platform_data(iotjs_spi_t* spi);
void iotjs_spi_destroy_platform_data(iotjs_spi_platform_data_t* pdata);

#endif /* IOTJS_MODULE_SPI_H */
