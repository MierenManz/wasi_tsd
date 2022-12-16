/// <reference path="./core.d.ts" />

declare namespace FS {
  /**
   * Size of a range of bytes in memory.
   *
   * ```
   * Size:      4 Bytes
   * Alignment: 4 Bytes
   * ```
   */
  export type Size = Core.u32;

  /**
   * Non-negative file size or length of a region within a file.
   *
   * ```
   * Size:      8 Bytes
   * Alignment: 8 Bytes
   * ```
   */
  export type FileSize = Core.u64;

  /**
   * Relative offset within a file.
   *
   * ```
   * Size:      8 Bytes
   * Alignment: 8 Bytes
   * ```
   */
  export type FileDelta = Core.i64;

  /**
   * Timestamp in nanoseconds
   *
   * ```
   * Size:      8 Bytes
   * Alignment: 8 Bytes
   * ```
   */
  export type TimeStamp = Core.u64;

  /**
   * Information associated with a descriptor.
   *
   * ```
   * Size:      2 Bytes
   * Alignment: 1 Byte
   * ```
   */
  export type FdInfo = {
    type: DescriptorType;
    flags: DescriptorFlags;
  };

  /**
   * The type of filesystem object referenced by a descriptor.
   *
   * ```
   * Size:      1 Byte
   * Alignment: 1 Byte
   * ```
   */
  export enum DescriptorType {
    /** The type of the descriptor or file is unknown or is different from any of the other types specified. */
    Unknown,
    /** The descriptor refers to a block device inode. */
    BlockDevice,
    /** The descriptor refers to a directory inode. */
    Directory,
    /** The descriptor refers to a named pipe. */
    Fifo,
    /** The file refers to a symbolic link inode. */
    SymbolicLink,
    /** The descriptor refers to a regular file inode. */
    RegularFile,
    /** The descriptor refers to a socket. */
    Socket,
  }

  /**
   * Descriptor flags.
   *
   * ```
   * Size:      1 Byte
   * Alignment: 1 Byte
   * ```
   * #
   * ```
   * Read     (bit 0) = 1
   * Write    (bit 1) = 2
   * Append   (bit 2) = 4
   * DSync    (bit 3) = 8
   * Nonblock (bit 4) = 16
   * Rsync    (bit 5) = 32
   * Sync     (bit 6) = 64
   * ```
   */
  export type DescriptorFlags = Core.u8;

  /**
   * File attributes.
   *
   * ```
   * Size:      64 Bytes
   * Alignment: 8 Bytes
   * ```
   */
  export type DescriptorStat = {
    /** Device ID of device containing the file. */
    dev: Device;
    /** File serial number. */
    ino: INode;
    /** File type. */
    type: DescriptorType;
    /** Number of hard links to the file. */
    nlink: LinkCount;
    /**
     * For regular file, the file size in bytes.
     *
     * For symbolic links, the length in bytes of the pathname contained in the symbolic link.
     */
    size: FileSize;
    /** Last data access timestamp. */
    atim: TimeStamp;
    /** Last data modification timestamp. */
    mtim: TimeStamp;
    /** Last file status change timestamp. */
    ctim: TimeStamp;
  };

  /**
   * Flags determiuning the method of how paths are resolved.
   *
   * ```
   * Size:      1 Byte
   * Alignment: 1 Byte
   * ```
   * #
   * ```
   * SymlinkFollow (bit 0) = 1
   * ```
   */
  export type AtFlags = Core.u8;

  /**
   * Open flags used by `openAt`.
   *
   * ```
   * Size:      1 Byte
   * Alignment: 1 Byte
   * ```
   * #
   * ```
   * Create    (bit 0) = 1
   * Directory (bit 1) = 2
   * Excl      (bit 2) = 4
   * Trunc     (bit 3) = 8
   * ```
   */
  export type OFlags = Core.u8;

  /**
   * Permissions mode used by `openAt`, `changePermissionAt`, and similar.
   *
   * ```
   * Size:      1 Byte
   * Alignment: 1 Byte
   * ```
   * #
   * ```
   * Readable   (bit 0) = 1
   * Writeable  (bit 1) = 2
   * Executable (bit 2) = 4
   * ```
   */
  export type Mode = Core.u8;

  /**
   * Number of hard links to an inode.
   *
   * ```
   * Size:      8 Bytes
   * Alignment: 8 Bytes
   * ```
   */
  export type LinkCount = Core.u64;

  /**
   * Identifier for a device containing a file system.
   *
   * Can be used in combination with `inode` to uniquely identify a file or directory in the filesystem.
   *
   * ```
   * Size:      8 Bytes
   * Alignment: 8 Bytes
   * ```
   */
  export type Device = Core.u64;

  /**
   * Filesystem object serial number that is unique within its file system.
   *
   * ```
   * Size:      8 Bytes
   * Alignment: 8 Bytes
   * ```
   */
  export type INode = Core.u64;

  export enum NewTimestampMode {
    /** Leave the timestamp set to its previous value. */
    NoChange = 0,
    /** Set the timestamp to the current time of the system clock associated with the filesystem. */
    Now = 1,
    /** Set the timestamp to the given value. */
    Timestamp = 2,
  }

  /**
   * When setting a timestamp, this gives the value to set it to.
   *
   * ```
   * Size:      16 Bytes
   * Alignment: 8 Bytes
   * ```
   */
  export type NewTimestamp = {
    kind: NewTimestampMode.NoChange | NewTimestampMode.Now;
  } | { kind: NewTimestampMode.Timestamp; value: TimeStamp };

  /**
   * A directory Entry.
   *
   * ```
   * Size:      16 Bytes
   * Alignment: 8 Bytes
   * ```
   */
  export type Dirent = {
    /** The serial number of the file reffered to by this directory entry. */
    ino: INode;
    /** The length of the name of the directory entry. */
    nameLen: Size;
    /** The type of the file referred to by this directory entry. */
    type: DescriptorType;
  };

  /**
   * File or memory access pattern advisory information.
   *
   * ```
   * Size:      1 Byte
   * Alignment: 1 Byte
   * ```
   */
  export enum Advice {
    /** The application has no advice to give on its behavior with respect to the specified data, */
    Normal,
    /** The application expects to access the specified data sequentially from lower offsets to higher offsets. */
    Sequential,
    /** The application expects to access the specified data in a random order. */
    Random,
    /** The application expects to access the specified data in the near future. */
    WillNeed,
    /** The application expects that it will not access the specified data in the near future. */
    DontNeed,
    /** The application expects to access the specified data once and then not reuse it thereafter. */
    NoReuse,
  }

  export enum SeekModes {
    /** Seek relative to start-of-file. */
    Set = 0,
    /** Seek relative to current position. */
    Cur = 1,
    /** Seek relative to end-of-file. */
    End = 2,
  }

  export type SeekFrom = { kind: SeekModes; offset: Size };

  export class Descriptor {
    /** Provide the file advisory information on a descriptor. */
    fadvice(
      offset: FileSize,
      len: Size,
      advice: Advice,
    ): Core.Result<void, Core.ErrNo>;

    /** Synchronize the data of a file to disk. */
    datasync(): Core.Result<void, Core.ErrNo>;

    /** Get flags associated with a descriptor. */
    flags(): Core.Result<DescriptorFlags, Core.ErrNo>;

    /** Get the dynamic type of a descriptor. */
    type(): Core.Result<DescriptorType, Core.ErrNo>;

    /** Set flags associated with a descriptor. */
    setFlags(): Core.Result<void, Core.ErrNo>;

    /**
     * Adjust the size of an open file.
     *
     * If this increases the file's size, the extra bytes are filled with zeros.
     */
    setSize(size: FileSize): Core.Result<void, Core.ErrNo>;

    /** Adjust the timestamps of an open file or directory. */
    setTimes(
      atim: NewTimestamp,
      mtim: NewTimestamp,
    ): Core.Result<void, Core.ErrNo>;

    /** Read from a descriptor, without using and updating the descriptor's offset. */
    pread(len: Size, offset: FileSize): Core.Result<Uint8Array, Core.ErrNo>;

    /** Write to a descriptor, without using and updating the descriptor's offset. */
    pwrite(
      buf: Uint8Array,
      offset: FileSize,
    ): Promise<Core.Result<Size, Core.ErrNo>>;

    /**
     * Read directory entries from a directory.
     *
     * When successful, the contents of the output buffer consist of a sequence of directory entries.
     *
     * Each directory entry consists of a `dirent` object, followed by a `Dirent.nameLen` bytes holding the name of the directory entry.
     */
    readdir(rewind: boolean): Core.Result<Array<[Dirent, string]>, Core.ErrNo>;

    /**
     * Move the offset of a descriptor.
     *
     * Returns new offset of the descriptor, relative to the start of the file.
     *
     * ### Warning
     * Using seek on directory is undefined behavior.
     */
    seek(from: SeekFrom): Core.Result<FileSize, Core.ErrNo>;

    /**
     * Synchronise the data and metadata of a file to disk.
     */
    sync(): Core.Result<void, Core.ErrNo>;

    /**
     * Returns the current offset of the descriptor, relative to the start of the file.
     */
    tell(): Core.Result<FileSize, Core.ErrNo>;

    /**
     * Create a directory
     */
    static createDirectoryAt(path: string): Core.Result<void, Core.ErrNo>;

    /**
     * Return the attributes of an open file or directory.
     */
    stat(): Core.Result<DescriptorStat, Core.ErrNo>;

    /**
     * Return the attributes of a file or directory.
     */
    static statAt(
      flags: AtFlags,
      path: string,
    ): Core.Result<DescriptorStat, Core.ErrNo>;

    /**
     * Adjust the timestamps of a file or directory.
     */
    static setTimesAt(
      flags: AtFlags,
      path: string,
      atim: NewTimestamp,
      mtim: NewTimestamp,
    ): Core.Result<void, Core.ErrNo>;

    /**
     * Create a hard link.
     */
    linkAt(
      atFlags: AtFlags,
      oldPath: string,
      newDescriptor: Descriptor,
      newPath: string,
    ): Core.Result<void, Core.ErrNo>;

    /**
     * Open a file or directory.
     */
    static openAt(
      atFlags: AtFlags,
      path: string,
      oFlags: OFlags,
      mode: Mode,
    ): Core.Result<Descriptor, Core.ErrNo>;

    static readLinkAt(path: string): Core.Result<string, Core.ErrNo>;
  }
}
