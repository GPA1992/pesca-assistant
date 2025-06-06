import { Model } from '@openmeteo/sdk/model.js';
import { VariablesWithTime } from '@openmeteo/sdk/variables-with-time.js';
import * as flatbuffers from 'flatbuffers';

export declare class WeatherApiResponse {
  bb: flatbuffers.ByteBuffer | null;
  bb_pos: number;
  __init(i: number, bb: flatbuffers.ByteBuffer): WeatherApiResponse;
  static getRootAsWeatherApiResponse(
    bb: flatbuffers.ByteBuffer,
    obj?: WeatherApiResponse,
  ): WeatherApiResponse;
  static getSizePrefixedRootAsWeatherApiResponse(
    bb: flatbuffers.ByteBuffer,
    obj?: WeatherApiResponse,
  ): WeatherApiResponse;
  latitude(): number;
  longitude(): number;
  elevation(): number;
  generationTimeMilliseconds(): number;
  locationId(): bigint;
  model(): Model;
  utcOffsetSeconds(): number;
  timezone(): string | null;
  timezone(optionalEncoding: flatbuffers.Encoding): string | Uint8Array | null;
  timezoneAbbreviation(): string | null;
  timezoneAbbreviation(
    optionalEncoding: flatbuffers.Encoding,
  ): string | Uint8Array | null;
  current(obj?: VariablesWithTime): VariablesWithTime | null;
  daily(obj?: VariablesWithTime): VariablesWithTime | null;
  hourly(obj?: VariablesWithTime): VariablesWithTime | null;
  minutely15(obj?: VariablesWithTime): VariablesWithTime | null;
  sixHourly(obj?: VariablesWithTime): VariablesWithTime | null;
}
