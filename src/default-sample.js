export default `
namespace "example:apex"

interface Greeter {
  sayHello(message:string): string
}

type AllTypes {
  i8: i8
  u8: u8
  i16: i16
  u16: u16
  i32: i32
  u32: u32
  i64: i64
  u64: u64
  f32: f32
  f64: f64
  bool: bool
  string: string
  datetime: datetime
  bytes: bytes
  raw: raw
  value: value
  optional: bool?
  map: {string:string}
  array: [string]
  richtype: OtherType
  enum: EnumType
}

type OtherType {
  data: u8
}

enum EnumType {
  first = 0,
  second = 1,
  third = 2,
}
`;
