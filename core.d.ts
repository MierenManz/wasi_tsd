declare namespace Core {
  export type u8 = number;
  export type u32 = number;
  export type i64 = bigint;
  export type u64 = bigint;
  export type Descriptor = u32;
  export type Result<T, E> = { status: 0; value: T } | { status: 1; error: E };

  /**
   * Error codes returned by functions.
   *
   * Not all of these error codes are returned by the functions provided by this API; some are used in higher-level library layers, and others are provided merely for alignment with POSIX.
   *
   * ```
   * Size:      1 Byte
   * Alignment: 1 Bytes
   * ```
   */
  // @TODO: Add Docs
  export enum ErrNo {
    TooBig,
    Access,
    AddrInUse,
    AddrNotAvail,
    AfNoSupport,
    Again,
    Already,
    BadF,
    BadMsg,
    Busy,
    Canceled,
    Child,
    ConnAborted,
    ConnRefused,
    ConnReset,
    DeadLk,
    DestAddrReq,
    DQuote,
    Exist,
    Fault,
    FBig,
    HostUnreach,
    Idrm,
    InProgress,
    Intr,
    Inval,
    IO,
    IsConn,
    IsDir,
    Loop,
    MFile,
    MsgSize,
    MultiHop,
    NameTooLong,
    NetDown,
    NetReset,
    NetUnreach,
    NFile,
    NoBufs,
    NoDev,
    NoEnt,
    NoExec,
    NoLck,
    NoLink,
    NoMem,
    NoMsg,
    NoProtoOpt,
    NoSpc,
    NoSys,
    NotDir,
    NotEmpty,
    NotRecoverable,
    NotSup,
    NoTTY,
    NxIO,
    Overflow,
    OwnerDead,
    Perm,
    Pipe,
    Range,
    RoFS,
    SPipe,
    Srch,
    Stale,
    TimedOut,
    TxtBsy,
    XDev,
  }

  /**
   * Returns whether or not the provided descriptor is valid.
   */
  export function isOpen(descriptor: Descriptor): boolean;

  /**
   * Closes a descriptor.
   */
  export function close(desc: Descriptor): boolean;
}
