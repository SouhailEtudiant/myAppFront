import {
  DomSanitizer
} from "./chunk-JE5LQNJT.js";
import {
  HttpClient
} from "./chunk-NEB6QTPY.js";
import {
  CommonModule,
  NgIf,
  NgStyle
} from "./chunk-PBRRM7OP.js";
import {
  Component,
  EventEmitter,
  Inject,
  Injectable,
  InjectionToken,
  Input,
  InputFlags,
  NgModule,
  Optional,
  Output,
  SecurityContext,
  __spreadValues,
  map,
  setClassMetadata,
  takeWhile,
  ɵɵNgOnChangesFeature,
  ɵɵadvance,
  ɵɵdefineComponent,
  ɵɵdefineInjectable,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵdirectiveInject,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵinject,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵreference,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵsanitizeUrl,
  ɵɵtemplate,
  ɵɵtemplateRefExtractor,
  ɵɵtext,
  ɵɵtextInterpolate1
} from "./chunk-6AXZGSSF.js";

// node_modules/ts-md5/dist/esm/md5.js
var Md5 = class _Md5 {
  constructor() {
    this._dataLength = 0;
    this._bufferLength = 0;
    this._state = new Int32Array(4);
    this._buffer = new ArrayBuffer(68);
    this._buffer8 = new Uint8Array(this._buffer, 0, 68);
    this._buffer32 = new Uint32Array(this._buffer, 0, 17);
    this.start();
  }
  static hashStr(str, raw = false) {
    return this.onePassHasher.start().appendStr(str).end(raw);
  }
  static hashAsciiStr(str, raw = false) {
    return this.onePassHasher.start().appendAsciiStr(str).end(raw);
  }
  static _hex(x) {
    const hc = _Md5.hexChars;
    const ho = _Md5.hexOut;
    let n;
    let offset;
    let j;
    let i;
    for (i = 0; i < 4; i += 1) {
      offset = i * 8;
      n = x[i];
      for (j = 0; j < 8; j += 2) {
        ho[offset + 1 + j] = hc.charAt(n & 15);
        n >>>= 4;
        ho[offset + 0 + j] = hc.charAt(n & 15);
        n >>>= 4;
      }
    }
    return ho.join("");
  }
  static _md5cycle(x, k) {
    let a = x[0];
    let b = x[1];
    let c = x[2];
    let d = x[3];
    a += (b & c | ~b & d) + k[0] - 680876936 | 0;
    a = (a << 7 | a >>> 25) + b | 0;
    d += (a & b | ~a & c) + k[1] - 389564586 | 0;
    d = (d << 12 | d >>> 20) + a | 0;
    c += (d & a | ~d & b) + k[2] + 606105819 | 0;
    c = (c << 17 | c >>> 15) + d | 0;
    b += (c & d | ~c & a) + k[3] - 1044525330 | 0;
    b = (b << 22 | b >>> 10) + c | 0;
    a += (b & c | ~b & d) + k[4] - 176418897 | 0;
    a = (a << 7 | a >>> 25) + b | 0;
    d += (a & b | ~a & c) + k[5] + 1200080426 | 0;
    d = (d << 12 | d >>> 20) + a | 0;
    c += (d & a | ~d & b) + k[6] - 1473231341 | 0;
    c = (c << 17 | c >>> 15) + d | 0;
    b += (c & d | ~c & a) + k[7] - 45705983 | 0;
    b = (b << 22 | b >>> 10) + c | 0;
    a += (b & c | ~b & d) + k[8] + 1770035416 | 0;
    a = (a << 7 | a >>> 25) + b | 0;
    d += (a & b | ~a & c) + k[9] - 1958414417 | 0;
    d = (d << 12 | d >>> 20) + a | 0;
    c += (d & a | ~d & b) + k[10] - 42063 | 0;
    c = (c << 17 | c >>> 15) + d | 0;
    b += (c & d | ~c & a) + k[11] - 1990404162 | 0;
    b = (b << 22 | b >>> 10) + c | 0;
    a += (b & c | ~b & d) + k[12] + 1804603682 | 0;
    a = (a << 7 | a >>> 25) + b | 0;
    d += (a & b | ~a & c) + k[13] - 40341101 | 0;
    d = (d << 12 | d >>> 20) + a | 0;
    c += (d & a | ~d & b) + k[14] - 1502002290 | 0;
    c = (c << 17 | c >>> 15) + d | 0;
    b += (c & d | ~c & a) + k[15] + 1236535329 | 0;
    b = (b << 22 | b >>> 10) + c | 0;
    a += (b & d | c & ~d) + k[1] - 165796510 | 0;
    a = (a << 5 | a >>> 27) + b | 0;
    d += (a & c | b & ~c) + k[6] - 1069501632 | 0;
    d = (d << 9 | d >>> 23) + a | 0;
    c += (d & b | a & ~b) + k[11] + 643717713 | 0;
    c = (c << 14 | c >>> 18) + d | 0;
    b += (c & a | d & ~a) + k[0] - 373897302 | 0;
    b = (b << 20 | b >>> 12) + c | 0;
    a += (b & d | c & ~d) + k[5] - 701558691 | 0;
    a = (a << 5 | a >>> 27) + b | 0;
    d += (a & c | b & ~c) + k[10] + 38016083 | 0;
    d = (d << 9 | d >>> 23) + a | 0;
    c += (d & b | a & ~b) + k[15] - 660478335 | 0;
    c = (c << 14 | c >>> 18) + d | 0;
    b += (c & a | d & ~a) + k[4] - 405537848 | 0;
    b = (b << 20 | b >>> 12) + c | 0;
    a += (b & d | c & ~d) + k[9] + 568446438 | 0;
    a = (a << 5 | a >>> 27) + b | 0;
    d += (a & c | b & ~c) + k[14] - 1019803690 | 0;
    d = (d << 9 | d >>> 23) + a | 0;
    c += (d & b | a & ~b) + k[3] - 187363961 | 0;
    c = (c << 14 | c >>> 18) + d | 0;
    b += (c & a | d & ~a) + k[8] + 1163531501 | 0;
    b = (b << 20 | b >>> 12) + c | 0;
    a += (b & d | c & ~d) + k[13] - 1444681467 | 0;
    a = (a << 5 | a >>> 27) + b | 0;
    d += (a & c | b & ~c) + k[2] - 51403784 | 0;
    d = (d << 9 | d >>> 23) + a | 0;
    c += (d & b | a & ~b) + k[7] + 1735328473 | 0;
    c = (c << 14 | c >>> 18) + d | 0;
    b += (c & a | d & ~a) + k[12] - 1926607734 | 0;
    b = (b << 20 | b >>> 12) + c | 0;
    a += (b ^ c ^ d) + k[5] - 378558 | 0;
    a = (a << 4 | a >>> 28) + b | 0;
    d += (a ^ b ^ c) + k[8] - 2022574463 | 0;
    d = (d << 11 | d >>> 21) + a | 0;
    c += (d ^ a ^ b) + k[11] + 1839030562 | 0;
    c = (c << 16 | c >>> 16) + d | 0;
    b += (c ^ d ^ a) + k[14] - 35309556 | 0;
    b = (b << 23 | b >>> 9) + c | 0;
    a += (b ^ c ^ d) + k[1] - 1530992060 | 0;
    a = (a << 4 | a >>> 28) + b | 0;
    d += (a ^ b ^ c) + k[4] + 1272893353 | 0;
    d = (d << 11 | d >>> 21) + a | 0;
    c += (d ^ a ^ b) + k[7] - 155497632 | 0;
    c = (c << 16 | c >>> 16) + d | 0;
    b += (c ^ d ^ a) + k[10] - 1094730640 | 0;
    b = (b << 23 | b >>> 9) + c | 0;
    a += (b ^ c ^ d) + k[13] + 681279174 | 0;
    a = (a << 4 | a >>> 28) + b | 0;
    d += (a ^ b ^ c) + k[0] - 358537222 | 0;
    d = (d << 11 | d >>> 21) + a | 0;
    c += (d ^ a ^ b) + k[3] - 722521979 | 0;
    c = (c << 16 | c >>> 16) + d | 0;
    b += (c ^ d ^ a) + k[6] + 76029189 | 0;
    b = (b << 23 | b >>> 9) + c | 0;
    a += (b ^ c ^ d) + k[9] - 640364487 | 0;
    a = (a << 4 | a >>> 28) + b | 0;
    d += (a ^ b ^ c) + k[12] - 421815835 | 0;
    d = (d << 11 | d >>> 21) + a | 0;
    c += (d ^ a ^ b) + k[15] + 530742520 | 0;
    c = (c << 16 | c >>> 16) + d | 0;
    b += (c ^ d ^ a) + k[2] - 995338651 | 0;
    b = (b << 23 | b >>> 9) + c | 0;
    a += (c ^ (b | ~d)) + k[0] - 198630844 | 0;
    a = (a << 6 | a >>> 26) + b | 0;
    d += (b ^ (a | ~c)) + k[7] + 1126891415 | 0;
    d = (d << 10 | d >>> 22) + a | 0;
    c += (a ^ (d | ~b)) + k[14] - 1416354905 | 0;
    c = (c << 15 | c >>> 17) + d | 0;
    b += (d ^ (c | ~a)) + k[5] - 57434055 | 0;
    b = (b << 21 | b >>> 11) + c | 0;
    a += (c ^ (b | ~d)) + k[12] + 1700485571 | 0;
    a = (a << 6 | a >>> 26) + b | 0;
    d += (b ^ (a | ~c)) + k[3] - 1894986606 | 0;
    d = (d << 10 | d >>> 22) + a | 0;
    c += (a ^ (d | ~b)) + k[10] - 1051523 | 0;
    c = (c << 15 | c >>> 17) + d | 0;
    b += (d ^ (c | ~a)) + k[1] - 2054922799 | 0;
    b = (b << 21 | b >>> 11) + c | 0;
    a += (c ^ (b | ~d)) + k[8] + 1873313359 | 0;
    a = (a << 6 | a >>> 26) + b | 0;
    d += (b ^ (a | ~c)) + k[15] - 30611744 | 0;
    d = (d << 10 | d >>> 22) + a | 0;
    c += (a ^ (d | ~b)) + k[6] - 1560198380 | 0;
    c = (c << 15 | c >>> 17) + d | 0;
    b += (d ^ (c | ~a)) + k[13] + 1309151649 | 0;
    b = (b << 21 | b >>> 11) + c | 0;
    a += (c ^ (b | ~d)) + k[4] - 145523070 | 0;
    a = (a << 6 | a >>> 26) + b | 0;
    d += (b ^ (a | ~c)) + k[11] - 1120210379 | 0;
    d = (d << 10 | d >>> 22) + a | 0;
    c += (a ^ (d | ~b)) + k[2] + 718787259 | 0;
    c = (c << 15 | c >>> 17) + d | 0;
    b += (d ^ (c | ~a)) + k[9] - 343485551 | 0;
    b = (b << 21 | b >>> 11) + c | 0;
    x[0] = a + x[0] | 0;
    x[1] = b + x[1] | 0;
    x[2] = c + x[2] | 0;
    x[3] = d + x[3] | 0;
  }
  /**
   * Initialise buffer to be hashed
   */
  start() {
    this._dataLength = 0;
    this._bufferLength = 0;
    this._state.set(_Md5.stateIdentity);
    return this;
  }
  // Char to code point to to array conversion:
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/charCodeAt
  // #Example.3A_Fixing_charCodeAt_to_handle_non-Basic-Multilingual-Plane_characters_if_their_presence_earlier_in_the_string_is_unknown
  /**
   * Append a UTF-8 string to the hash buffer
   * @param str String to append
   */
  appendStr(str) {
    const buf8 = this._buffer8;
    const buf32 = this._buffer32;
    let bufLen = this._bufferLength;
    let code;
    let i;
    for (i = 0; i < str.length; i += 1) {
      code = str.charCodeAt(i);
      if (code < 128) {
        buf8[bufLen++] = code;
      } else if (code < 2048) {
        buf8[bufLen++] = (code >>> 6) + 192;
        buf8[bufLen++] = code & 63 | 128;
      } else if (code < 55296 || code > 56319) {
        buf8[bufLen++] = (code >>> 12) + 224;
        buf8[bufLen++] = code >>> 6 & 63 | 128;
        buf8[bufLen++] = code & 63 | 128;
      } else {
        code = (code - 55296) * 1024 + (str.charCodeAt(++i) - 56320) + 65536;
        if (code > 1114111) {
          throw new Error("Unicode standard supports code points up to U+10FFFF");
        }
        buf8[bufLen++] = (code >>> 18) + 240;
        buf8[bufLen++] = code >>> 12 & 63 | 128;
        buf8[bufLen++] = code >>> 6 & 63 | 128;
        buf8[bufLen++] = code & 63 | 128;
      }
      if (bufLen >= 64) {
        this._dataLength += 64;
        _Md5._md5cycle(this._state, buf32);
        bufLen -= 64;
        buf32[0] = buf32[16];
      }
    }
    this._bufferLength = bufLen;
    return this;
  }
  /**
   * Append an ASCII string to the hash buffer
   * @param str String to append
   */
  appendAsciiStr(str) {
    const buf8 = this._buffer8;
    const buf32 = this._buffer32;
    let bufLen = this._bufferLength;
    let i;
    let j = 0;
    for (; ; ) {
      i = Math.min(str.length - j, 64 - bufLen);
      while (i--) {
        buf8[bufLen++] = str.charCodeAt(j++);
      }
      if (bufLen < 64) {
        break;
      }
      this._dataLength += 64;
      _Md5._md5cycle(this._state, buf32);
      bufLen = 0;
    }
    this._bufferLength = bufLen;
    return this;
  }
  /**
   * Append a byte array to the hash buffer
   * @param input array to append
   */
  appendByteArray(input) {
    const buf8 = this._buffer8;
    const buf32 = this._buffer32;
    let bufLen = this._bufferLength;
    let i;
    let j = 0;
    for (; ; ) {
      i = Math.min(input.length - j, 64 - bufLen);
      while (i--) {
        buf8[bufLen++] = input[j++];
      }
      if (bufLen < 64) {
        break;
      }
      this._dataLength += 64;
      _Md5._md5cycle(this._state, buf32);
      bufLen = 0;
    }
    this._bufferLength = bufLen;
    return this;
  }
  /**
   * Get the state of the hash buffer
   */
  getState() {
    const s = this._state;
    return {
      buffer: String.fromCharCode.apply(null, Array.from(this._buffer8)),
      buflen: this._bufferLength,
      length: this._dataLength,
      state: [s[0], s[1], s[2], s[3]]
    };
  }
  /**
   * Override the current state of the hash buffer
   * @param state New hash buffer state
   */
  setState(state) {
    const buf = state.buffer;
    const x = state.state;
    const s = this._state;
    let i;
    this._dataLength = state.length;
    this._bufferLength = state.buflen;
    s[0] = x[0];
    s[1] = x[1];
    s[2] = x[2];
    s[3] = x[3];
    for (i = 0; i < buf.length; i += 1) {
      this._buffer8[i] = buf.charCodeAt(i);
    }
  }
  /**
   * Hash the current state of the hash buffer and return the result
   * @param raw Whether to return the value as an `Int32Array`
   */
  end(raw = false) {
    const bufLen = this._bufferLength;
    const buf8 = this._buffer8;
    const buf32 = this._buffer32;
    const i = (bufLen >> 2) + 1;
    this._dataLength += bufLen;
    const dataBitsLen = this._dataLength * 8;
    buf8[bufLen] = 128;
    buf8[bufLen + 1] = buf8[bufLen + 2] = buf8[bufLen + 3] = 0;
    buf32.set(_Md5.buffer32Identity.subarray(i), i);
    if (bufLen > 55) {
      _Md5._md5cycle(this._state, buf32);
      buf32.set(_Md5.buffer32Identity);
    }
    if (dataBitsLen <= 4294967295) {
      buf32[14] = dataBitsLen;
    } else {
      const matches = dataBitsLen.toString(16).match(/(.*?)(.{0,8})$/);
      if (matches === null) {
        return;
      }
      const lo = parseInt(matches[2], 16);
      const hi = parseInt(matches[1], 16) || 0;
      buf32[14] = lo;
      buf32[15] = hi;
    }
    _Md5._md5cycle(this._state, buf32);
    return raw ? this._state : _Md5._hex(this._state);
  }
};
Md5.stateIdentity = new Int32Array([1732584193, -271733879, -1732584194, 271733878]);
Md5.buffer32Identity = new Int32Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
Md5.hexChars = "0123456789abcdef";
Md5.hexOut = [];
Md5.onePassHasher = new Md5();
if (Md5.hashStr("hello") !== "5d41402abc4b2a76b9719d911017c592") {
  throw new Error("Md5 self test failed.");
}

// node_modules/ngx-avatars/fesm2022/ngx-avatars.mjs
function AvatarComponent_img_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "img", 3);
    ɵɵlistener("error", function AvatarComponent_img_1_Template_img_error_0_listener() {
      ɵɵrestoreView(_r2);
      const ctx_r2 = ɵɵnextContext();
      return ɵɵresetView(ctx_r2.fetchAvatarSource());
    });
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = ɵɵnextContext();
    ɵɵproperty("src", ctx_r2.avatarSrc, ɵɵsanitizeUrl)("alt", ctx_r2.customAlt ? ctx_r2.customAlt : ctx_r2.avatarAlt)("width", ctx_r2.size)("height", ctx_r2.size)("ngStyle", ctx_r2.avatarStyle)("referrerPolicy", ctx_r2.referrerpolicy);
  }
}
function AvatarComponent_ng_template_2_div_0_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "div", 5);
    ɵɵtext(1);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = ɵɵnextContext(2);
    ɵɵproperty("ngStyle", ctx_r2.avatarStyle);
    ɵɵadvance();
    ɵɵtextInterpolate1(" ", ctx_r2.avatarText, " ");
  }
}
function AvatarComponent_ng_template_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, AvatarComponent_ng_template_2_div_0_Template, 2, 2, "div", 4);
  }
  if (rf & 2) {
    const ctx_r2 = ɵɵnextContext();
    ɵɵproperty("ngIf", ctx_r2.avatarText);
  }
}
var AsyncSource = class {
  constructor(sourceId) {
    this.sourceId = sourceId;
  }
};
var AvatarSource;
(function(AvatarSource2) {
  AvatarSource2["FACEBOOK"] = "facebook";
  AvatarSource2["GOOGLE"] = "google";
  AvatarSource2["TWITTER"] = "twitter";
  AvatarSource2["INSTAGRAM"] = "instagram";
  AvatarSource2["VKONTAKTE"] = "vkontakte";
  AvatarSource2["SKYPE"] = "skype";
  AvatarSource2["GRAVATAR"] = "gravatar";
  AvatarSource2["GITHUB"] = "github";
  AvatarSource2["CUSTOM"] = "custom";
  AvatarSource2["INITIALS"] = "initials";
  AvatarSource2["VALUE"] = "value";
})(AvatarSource || (AvatarSource = {}));
var Facebook = class {
  constructor(sourceId) {
    this.sourceId = sourceId;
    this.sourceType = AvatarSource.FACEBOOK;
  }
  getAvatar(size) {
    return `https://graph.facebook.com/${this.sourceId}/picture?width=${size}&height=${size}`;
  }
};
var Twitter = class {
  constructor(sourceId) {
    this.sourceId = sourceId;
    this.sourceType = AvatarSource.TWITTER;
  }
  getAvatar(size) {
    const twitterImgSize = this.getImageSize(size);
    return `https://twitter.com/${this.sourceId}/profile_image?size=${twitterImgSize}`;
  }
  getImageSize(size) {
    if (size <= 24) {
      return "mini";
    }
    if (size <= 48) {
      return "normal";
    }
    if (size <= 73) {
      return "bigger";
    }
    return "original";
  }
};
var Google = class extends AsyncSource {
  constructor(sourceId) {
    super(sourceId);
    this.sourceType = AvatarSource.GOOGLE;
  }
  getAvatar() {
    return `https://picasaweb.google.com/data/entry/api/user/${this.sourceId}?alt=json`;
  }
  /**
   * Extract google avatar from json data
   */
  processResponse(data, size) {
    const avatarSrc = data.entry.gphoto$thumbnail.$t;
    if (avatarSrc) {
      return avatarSrc.replace("s64", "s" + size);
    }
    return null;
  }
};
var Instagram = class extends AsyncSource {
  constructor(sourceId) {
    super(sourceId);
    this.sourceType = AvatarSource.INSTAGRAM;
  }
  getAvatar() {
    return `https://www.instagram.com/${this.sourceId}/?__a=1`;
  }
  /**
   * extract instagram avatar from json data
   */
  processResponse(data, size) {
    return `${data.graphql.user.profile_pic_url_hd}&s=${size}`;
  }
};
var Custom = class {
  constructor(sourceId) {
    this.sourceId = sourceId;
    this.sourceType = AvatarSource.CUSTOM;
  }
  getAvatar() {
    return this.sourceId;
  }
};
var Initials = class {
  constructor(sourceId) {
    this.sourceId = sourceId;
    this.sourceType = AvatarSource.INITIALS;
  }
  getAvatar(size) {
    return this.getInitials(this.sourceId, size);
  }
  /**
   * Returns the initial letters of a name in a string.
   */
  getInitials(name, size) {
    name = name.trim();
    if (!name) {
      return "";
    }
    const initials = name.split(" ");
    if (size && size < initials.length) {
      return this.constructInitials(initials.slice(0, size));
    } else {
      return this.constructInitials(initials);
    }
  }
  /**
   * Iterates a person's name string to get the initials of each word in uppercase.
   */
  constructInitials(elements) {
    if (!elements || !elements.length) {
      return "";
    }
    return elements.filter((element) => element && element.length > 0).map((element) => element[0].toUpperCase()).join("");
  }
};
function isRetina() {
  if (typeof window !== "undefined" && window !== null) {
    if (window.devicePixelRatio > 1.25) {
      return true;
    }
    const mediaQuery = "(-webkit-min-device-pixel-ratio: 1.25), (min--moz-device-pixel-ratio: 1.25), (-o-min-device-pixel-ratio: 5/4), (min-resolution: 1.25dppx)";
    if (window.matchMedia && window.matchMedia(mediaQuery).matches) {
      return true;
    }
  }
  return false;
}
var Gravatar = class {
  constructor(value) {
    this.value = value;
    this.sourceType = AvatarSource.GRAVATAR;
    this.sourceId = value.match("^[a-f0-9]{32}$") ? value : Md5.hashStr(value).toString();
  }
  getAvatar(size) {
    const avatarSize = isRetina() ? size * 2 : size;
    return `https://secure.gravatar.com/avatar/${this.sourceId}?s=${avatarSize}&d=404`;
  }
};
var Skype = class {
  constructor(sourceId) {
    this.sourceId = sourceId;
    this.sourceType = AvatarSource.SKYPE;
  }
  getAvatar() {
    return `https://api.skype.com/users/${this.sourceId}/profile/avatar`;
  }
};
var Value = class {
  constructor(sourceId) {
    this.sourceId = sourceId;
    this.sourceType = AvatarSource.VALUE;
  }
  getAvatar() {
    return this.sourceId;
  }
};
var apiVersion = 5.8;
var Vkontakte = class extends AsyncSource {
  constructor(sourceId) {
    super(sourceId);
    this.sourceType = AvatarSource.VKONTAKTE;
  }
  getAvatar(size) {
    const imgSize = this.getImageSize(size);
    return `https://api.vk.com/method/users.get?user_id=${this.sourceId}&v=${apiVersion}&fields=${imgSize}`;
  }
  /**
   * extract vkontakte avatar from json data
   */
  processResponse(data) {
    const sizeProperty = Object.keys(data["response"][0]).pop();
    if (!sizeProperty) {
      return null;
    }
    return data["response"][0][sizeProperty] || null;
  }
  /**
   * Returns image size related to vkontakte API
   */
  getImageSize(size) {
    if (size <= 50) {
      return "photo_50";
    }
    if (size <= 100) {
      return "photo_100";
    }
    if (size <= 200) {
      return "photo_200";
    }
    return "photo_max";
  }
};
var Github = class extends AsyncSource {
  constructor(sourceId) {
    super(sourceId);
    this.sourceType = AvatarSource.GITHUB;
  }
  getAvatar() {
    return `https://api.github.com/users/${this.sourceId}`;
  }
  /**
   * extract github avatar from json data
   */
  processResponse(data, size) {
    if (size) {
      return `${data.avatar_url}&s=${size}`;
    }
    return data.avatar_url;
  }
};
var AVATAR_CONFIG = new InjectionToken("avatar.config");
var _AvatarConfigService = class _AvatarConfigService {
  constructor(userConfig) {
    this.userConfig = userConfig;
  }
  getAvatarSources(defaultSources2) {
    if (this.userConfig && this.userConfig.sourcePriorityOrder && this.userConfig.sourcePriorityOrder.length) {
      const uniqueSources = [...new Set(this.userConfig.sourcePriorityOrder)];
      const validSources = uniqueSources.filter((source) => defaultSources2.includes(source));
      return [...validSources, ...defaultSources2.filter((source) => !validSources.includes(source))];
    }
    return defaultSources2;
  }
  getAvatarColors(defaultColors2) {
    return this.userConfig && this.userConfig.colors && this.userConfig.colors.length && this.userConfig.colors || defaultColors2;
  }
  getDisableSrcCache(defaultDisableSrcCache2) {
    if (this.userConfig == null || this.userConfig.disableSrcCache == null) {
      return defaultDisableSrcCache2;
    } else {
      return this.userConfig.disableSrcCache;
    }
  }
};
_AvatarConfigService.ɵfac = function AvatarConfigService_Factory(t) {
  return new (t || _AvatarConfigService)(ɵɵinject(AVATAR_CONFIG, 8));
};
_AvatarConfigService.ɵprov = ɵɵdefineInjectable({
  token: _AvatarConfigService,
  factory: _AvatarConfigService.ɵfac,
  providedIn: "root"
});
var AvatarConfigService = _AvatarConfigService;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AvatarConfigService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [{
    type: void 0,
    decorators: [{
      type: Optional
    }, {
      type: Inject,
      args: [AVATAR_CONFIG]
    }]
  }], null);
})();
var defaultSources = [AvatarSource.FACEBOOK, AvatarSource.GOOGLE, AvatarSource.TWITTER, AvatarSource.INSTAGRAM, AvatarSource.VKONTAKTE, AvatarSource.SKYPE, AvatarSource.GRAVATAR, AvatarSource.GITHUB, AvatarSource.CUSTOM, AvatarSource.INITIALS, AvatarSource.VALUE];
var defaultColors = ["#1abc9c", "#3498db", "#f1c40f", "#8e44ad", "#e74c3c", "#d35400", "#2c3e50", "#7f8c8d"];
var defaultDisableSrcCache = false;
var _AvatarService = class _AvatarService {
  constructor(http, avatarConfigService) {
    this.http = http;
    this.avatarConfigService = avatarConfigService;
    this.avatarSources = defaultSources;
    this.avatarColors = defaultColors;
    this.failedSources = /* @__PURE__ */ new Map();
    this.overrideAvatarSources();
    this.overrideAvatarColors();
  }
  fetchAvatar(avatarUrl) {
    return this.http.get(avatarUrl);
  }
  getRandomColor(avatarText) {
    if (!avatarText) {
      return "transparent";
    }
    const asciiCodeSum = this.calculateAsciiCode(avatarText);
    return this.avatarColors[asciiCodeSum % this.avatarColors.length];
  }
  compareSources(sourceType1, sourceType2) {
    return this.getSourcePriority(sourceType1) - this.getSourcePriority(sourceType2);
  }
  isSource(source) {
    return this.avatarSources.includes(source);
  }
  isTextAvatar(sourceType) {
    return [AvatarSource.INITIALS, AvatarSource.VALUE].includes(sourceType);
  }
  buildSourceKey(source) {
    return source.sourceType + "-" + source.sourceId;
  }
  sourceHasFailedBefore(source) {
    return this.failedSources.has(this.buildSourceKey(source));
  }
  markSourceAsFailed(source) {
    this.failedSources.set(this.buildSourceKey(source), source);
  }
  overrideAvatarSources() {
    this.avatarSources = this.avatarConfigService.getAvatarSources(defaultSources);
  }
  overrideAvatarColors() {
    this.avatarColors = this.avatarConfigService.getAvatarColors(defaultColors);
  }
  calculateAsciiCode(value) {
    return value.split("").map((letter) => letter.charCodeAt(0)).reduce((previous, current) => previous + current);
  }
  getSourcePriority(sourceType) {
    return this.avatarSources.indexOf(sourceType);
  }
};
_AvatarService.ɵfac = function AvatarService_Factory(t) {
  return new (t || _AvatarService)(ɵɵinject(HttpClient), ɵɵinject(AvatarConfigService));
};
_AvatarService.ɵprov = ɵɵdefineInjectable({
  token: _AvatarService,
  factory: _AvatarService.ɵfac,
  providedIn: "root"
});
var AvatarService = _AvatarService;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AvatarService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [{
    type: HttpClient
  }, {
    type: AvatarConfigService
  }], null);
})();
var CustomNoCache = class {
  constructor(sourceId) {
    this.sourceId = sourceId;
    this.sourceType = AvatarSource.CUSTOM;
  }
  getAvatar() {
    const urlSuffix = Math.random();
    return `${this.sourceId}${this.sourceId.indexOf("?") > -1 ? "&" : "?"}_=${urlSuffix}`;
  }
};
var _SourceFactory = class _SourceFactory {
  constructor(avatarConfigService) {
    this.sources = {};
    const disableSrcCache = avatarConfigService.getDisableSrcCache(defaultDisableSrcCache);
    this.sources[AvatarSource.FACEBOOK] = Facebook;
    this.sources[AvatarSource.TWITTER] = Twitter;
    this.sources[AvatarSource.GOOGLE] = Google;
    this.sources[AvatarSource.INSTAGRAM] = Instagram;
    this.sources[AvatarSource.SKYPE] = Skype;
    this.sources[AvatarSource.GRAVATAR] = Gravatar;
    this.sources[AvatarSource.CUSTOM] = disableSrcCache ? CustomNoCache : Custom;
    this.sources[AvatarSource.INITIALS] = Initials;
    this.sources[AvatarSource.VALUE] = Value;
    this.sources[AvatarSource.VKONTAKTE] = Vkontakte;
    this.sources[AvatarSource.GITHUB] = Github;
  }
  newInstance(sourceType, sourceValue) {
    return new this.sources[sourceType](sourceValue);
  }
};
_SourceFactory.ɵfac = function SourceFactory_Factory(t) {
  return new (t || _SourceFactory)(ɵɵinject(AvatarConfigService));
};
_SourceFactory.ɵprov = ɵɵdefineInjectable({
  token: _SourceFactory,
  factory: _SourceFactory.ɵfac,
  providedIn: "root"
});
var SourceFactory = _SourceFactory;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SourceFactory, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [{
    type: AvatarConfigService
  }], null);
})();
var _AvatarComponent = class _AvatarComponent {
  constructor(sourceFactory, avatarService, sanitizer) {
    this.sourceFactory = sourceFactory;
    this.avatarService = avatarService;
    this.sanitizer = sanitizer;
    this.round = true;
    this.size = 50;
    this.textSizeRatio = 3;
    this.fgColor = "#FFF";
    this.style = {};
    this.cornerRadius = 0;
    this.initialsSize = 0;
    this.clickOnAvatar = new EventEmitter();
    this.isAlive = true;
    this.avatarSrc = null;
    this.avatarAlt = null;
    this.avatarText = null;
    this.avatarStyle = {};
    this.hostStyle = {};
    this.currentIndex = -1;
    this.sources = [];
  }
  onAvatarClicked() {
    this.clickOnAvatar.emit(this.sources[this.currentIndex]);
  }
  /**
   * Detect inputs change
   *
   * param {{ [propKey: string]: SimpleChange }} changes
   *
   * memberof AvatarComponent
   */
  ngOnChanges(changes) {
    for (const propName in changes) {
      if (this.avatarService.isSource(propName)) {
        const sourceType = AvatarSource[propName.toUpperCase()];
        const currentValue = changes[propName].currentValue;
        if (currentValue && typeof currentValue === "string") {
          this.addSource(sourceType, currentValue);
        } else {
          const sanitized = this.sanitizer.sanitize(SecurityContext.URL, currentValue);
          if (sanitized) {
            this.addSource(sourceType, sanitized);
          } else {
            this.removeSource(sourceType);
          }
        }
      }
    }
    this.initializeAvatar();
  }
  /**
   * Fetch avatar source
   *
   * memberOf AvatarComponent
   */
  fetchAvatarSource() {
    const previousSource = this.sources[this.currentIndex];
    if (previousSource) {
      this.avatarService.markSourceAsFailed(previousSource);
    }
    const source = this.findNextSource();
    if (!source) {
      return;
    }
    if (this.avatarService.isTextAvatar(source.sourceType)) {
      this.buildTextAvatar(source);
      this.avatarSrc = null;
    } else {
      this.buildImageAvatar(source);
    }
  }
  findNextSource() {
    while (++this.currentIndex < this.sources.length) {
      const source = this.sources[this.currentIndex];
      if (source && !this.avatarService.sourceHasFailedBefore(source)) {
        return source;
      }
    }
    return null;
  }
  ngOnDestroy() {
    this.isAlive = false;
  }
  /**
   * Initialize the avatar component and its fallback system
   */
  initializeAvatar() {
    this.currentIndex = -1;
    if (this.sources.length > 0) {
      this.sortAvatarSources();
      this.fetchAvatarSource();
      this.hostStyle = {
        width: this.size + "px",
        height: this.size + "px"
      };
    }
  }
  sortAvatarSources() {
    this.sources.sort((source1, source2) => this.avatarService.compareSources(source1.sourceType, source2.sourceType));
  }
  buildTextAvatar(avatarSource) {
    this.avatarText = avatarSource.getAvatar(+this.initialsSize);
    this.avatarStyle = this.getInitialsStyle(avatarSource.sourceId);
  }
  buildImageAvatar(avatarSource) {
    this.avatarStyle = this.getImageStyle();
    if (avatarSource instanceof AsyncSource) {
      this.fetchAndProcessAsyncAvatar(avatarSource);
    } else {
      this.avatarSrc = this.sanitizer.bypassSecurityTrustUrl(avatarSource.getAvatar(+this.size));
      this.avatarAlt = avatarSource.getAvatar(+this.size);
    }
  }
  /**
   *
   * returns initials style
   *
   * memberOf AvatarComponent
   */
  getInitialsStyle(avatarValue) {
    return __spreadValues({
      textAlign: "center",
      borderRadius: this.round ? "100%" : this.cornerRadius + "px",
      border: this.borderColor ? "1px solid " + this.borderColor : "",
      textTransform: "uppercase",
      color: this.fgColor,
      backgroundColor: this.bgColor ? this.bgColor : this.avatarService.getRandomColor(avatarValue),
      font: Math.floor(+this.size / this.textSizeRatio) + "px Helvetica, Arial, sans-serif",
      lineHeight: this.size + "px"
    }, this.style);
  }
  /**
   *
   * returns image style
   *
   * memberOf AvatarComponent
   */
  getImageStyle() {
    return __spreadValues({
      maxWidth: "100%",
      borderRadius: this.round ? "50%" : this.cornerRadius + "px",
      border: this.borderColor ? "1px solid " + this.borderColor : "",
      width: this.size + "px",
      height: this.size + "px"
    }, this.style);
  }
  /**
   * Fetch avatar image asynchronously.
   *
   * param {Source} source represents avatar source
   * memberof AvatarComponent
   */
  fetchAndProcessAsyncAvatar(source) {
    if (this.avatarService.sourceHasFailedBefore(source)) {
      return;
    }
    this.avatarService.fetchAvatar(source.getAvatar(+this.size)).pipe(takeWhile(() => this.isAlive), map((response) => source.processResponse(response, +this.size))).subscribe({
      next: (avatarSrc) => this.avatarSrc = avatarSrc,
      error: () => {
        this.fetchAvatarSource();
      }
    });
  }
  /**
   * Add avatar source
   *
   * param sourceType avatar source type e.g facebook,twitter, etc.
   * param sourceValue  source value e.g facebookId value, etc.
   */
  addSource(sourceType, sourceValue) {
    const source = this.sources.find((s) => s.sourceType === sourceType);
    if (source) {
      source.sourceId = sourceValue;
    } else {
      this.sources.push(this.sourceFactory.newInstance(sourceType, sourceValue));
    }
  }
  /**
   * Remove avatar source
   *
   * param sourceType avatar source type e.g facebook,twitter, etc.
   */
  removeSource(sourceType) {
    this.sources = this.sources.filter((source) => source.sourceType !== sourceType);
  }
};
_AvatarComponent.ɵfac = function AvatarComponent_Factory(t) {
  return new (t || _AvatarComponent)(ɵɵdirectiveInject(SourceFactory), ɵɵdirectiveInject(AvatarService), ɵɵdirectiveInject(DomSanitizer));
};
_AvatarComponent.ɵcmp = ɵɵdefineComponent({
  type: _AvatarComponent,
  selectors: [["ngx-avatars"]],
  inputs: {
    round: "round",
    size: "size",
    textSizeRatio: "textSizeRatio",
    bgColor: "bgColor",
    fgColor: "fgColor",
    borderColor: "borderColor",
    style: "style",
    cornerRadius: "cornerRadius",
    facebook: [InputFlags.None, "facebookId", "facebook"],
    twitter: [InputFlags.None, "twitterId", "twitter"],
    google: [InputFlags.None, "googleId", "google"],
    instagram: [InputFlags.None, "instagramId", "instagram"],
    vkontakte: [InputFlags.None, "vkontakteId", "vkontakte"],
    skype: [InputFlags.None, "skypeId", "skype"],
    gravatar: [InputFlags.None, "gravatarId", "gravatar"],
    github: [InputFlags.None, "githubId", "github"],
    custom: [InputFlags.None, "src", "custom"],
    customAlt: [InputFlags.None, "alt", "customAlt"],
    initials: [InputFlags.None, "name", "initials"],
    value: "value",
    referrerpolicy: "referrerpolicy",
    placeholder: "placeholder",
    initialsSize: "initialsSize"
  },
  outputs: {
    clickOnAvatar: "clickOnAvatar"
  },
  features: [ɵɵNgOnChangesFeature],
  decls: 4,
  vars: 3,
  consts: [["textAvatar", ""], [1, "avatar-container", 3, "click", "ngStyle"], ["class", "avatar-content", "loading", "lazy", 3, "src", "alt", "width", "height", "ngStyle", "referrerPolicy", "error", 4, "ngIf", "ngIfElse"], ["loading", "lazy", 1, "avatar-content", 3, "error", "src", "alt", "width", "height", "ngStyle", "referrerPolicy"], ["class", "avatar-content", 3, "ngStyle", 4, "ngIf"], [1, "avatar-content", 3, "ngStyle"]],
  template: function AvatarComponent_Template(rf, ctx) {
    if (rf & 1) {
      const _r1 = ɵɵgetCurrentView();
      ɵɵelementStart(0, "div", 1);
      ɵɵlistener("click", function AvatarComponent_Template_div_click_0_listener() {
        ɵɵrestoreView(_r1);
        return ɵɵresetView(ctx.onAvatarClicked());
      });
      ɵɵtemplate(1, AvatarComponent_img_1_Template, 1, 6, "img", 2)(2, AvatarComponent_ng_template_2_Template, 1, 1, "ng-template", null, 0, ɵɵtemplateRefExtractor);
      ɵɵelementEnd();
    }
    if (rf & 2) {
      const textAvatar_r4 = ɵɵreference(3);
      ɵɵproperty("ngStyle", ctx.hostStyle);
      ɵɵadvance();
      ɵɵproperty("ngIf", ctx.avatarSrc)("ngIfElse", textAvatar_r4);
    }
  },
  dependencies: [NgIf, NgStyle],
  styles: ["[_nghost-%COMP%]{border-radius:50%}"]
});
var AvatarComponent = _AvatarComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AvatarComponent, [{
    type: Component,
    args: [{
      selector: "ngx-avatars",
      template: `
      <div
              (click)="onAvatarClicked()"
              class="avatar-container"
              [ngStyle]="hostStyle"
      >
          <img
                  *ngIf="avatarSrc; else textAvatar"
                  [src]="avatarSrc"
                  [alt]="(customAlt)? customAlt: avatarAlt"
                  [width]="size"
                  [height]="size"
                  [ngStyle]="avatarStyle"
                  [referrerPolicy]="referrerpolicy"
                  (error)="fetchAvatarSource()"
                  class="avatar-content"
                  loading="lazy"
          />
          <ng-template #textAvatar>
              <div *ngIf="avatarText" class="avatar-content" [ngStyle]="avatarStyle">
                  {{ avatarText }}
              </div>
          </ng-template>
      </div>
  `,
      styles: [":host{border-radius:50%}\n"]
    }]
  }], () => [{
    type: SourceFactory
  }, {
    type: AvatarService
  }, {
    type: DomSanitizer
  }], {
    round: [{
      type: Input
    }],
    size: [{
      type: Input
    }],
    textSizeRatio: [{
      type: Input
    }],
    bgColor: [{
      type: Input
    }],
    fgColor: [{
      type: Input
    }],
    borderColor: [{
      type: Input
    }],
    style: [{
      type: Input
    }],
    cornerRadius: [{
      type: Input
    }],
    facebook: [{
      type: Input,
      args: ["facebookId"]
    }],
    twitter: [{
      type: Input,
      args: ["twitterId"]
    }],
    google: [{
      type: Input,
      args: ["googleId"]
    }],
    instagram: [{
      type: Input,
      args: ["instagramId"]
    }],
    vkontakte: [{
      type: Input,
      args: ["vkontakteId"]
    }],
    skype: [{
      type: Input,
      args: ["skypeId"]
    }],
    gravatar: [{
      type: Input,
      args: ["gravatarId"]
    }],
    github: [{
      type: Input,
      args: ["githubId"]
    }],
    custom: [{
      type: Input,
      args: ["src"]
    }],
    customAlt: [{
      type: Input,
      args: ["alt"]
    }],
    initials: [{
      type: Input,
      args: ["name"]
    }],
    value: [{
      type: Input
    }],
    referrerpolicy: [{
      type: Input
    }],
    placeholder: [{
      type: Input
    }],
    initialsSize: [{
      type: Input
    }],
    clickOnAvatar: [{
      type: Output
    }]
  });
})();
var _AvatarModule = class _AvatarModule {
  static forRoot(avatarConfig) {
    return {
      ngModule: _AvatarModule,
      providers: [{
        provide: AVATAR_CONFIG,
        useValue: avatarConfig ? avatarConfig : {}
      }]
    };
  }
};
_AvatarModule.ɵfac = function AvatarModule_Factory(t) {
  return new (t || _AvatarModule)();
};
_AvatarModule.ɵmod = ɵɵdefineNgModule({
  type: _AvatarModule,
  declarations: [AvatarComponent],
  imports: [CommonModule],
  exports: [AvatarComponent]
});
_AvatarModule.ɵinj = ɵɵdefineInjector({
  providers: [SourceFactory, AvatarService, AvatarConfigService],
  imports: [CommonModule]
});
var AvatarModule = _AvatarModule;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AvatarModule, [{
    type: NgModule,
    args: [{
      imports: [CommonModule],
      declarations: [AvatarComponent],
      providers: [SourceFactory, AvatarService, AvatarConfigService],
      exports: [AvatarComponent]
    }]
  }], null, null);
})();
export {
  AvatarComponent,
  AvatarModule,
  AvatarService,
  AvatarSource,
  defaultColors,
  defaultDisableSrcCache,
  defaultSources
};
//# sourceMappingURL=ngx-avatars.js.map
