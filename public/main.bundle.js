webpackJsonp([0,3],{

/***/ 125:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_material__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ng2_device_detector__ = __webpack_require__(285);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__quran_service__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__msg_service__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__windowRef__ = __webpack_require__(72);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__auth_service__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__khatm_service__ = __webpack_require__(56);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var AppComponent = (function () {
    function AppComponent(quranService, msgService, snackBar, winRef, deviceService, authService, khatmService) {
        this.quranService = quranService;
        this.msgService = msgService;
        this.snackBar = snackBar;
        this.winRef = winRef;
        this.deviceService = deviceService;
        this.authService = authService;
        this.khatmService = khatmService;
        this.nightMode = false;
        this.storeAddress = '';
        this.showLink = true;
    }
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.msgService.msg$.subscribe(function (msg) {
            _this.snackBar.open(msg, 'x', { duration: 3000, extraClasses: ['snackBar'] });
        });
        this.msgService.warn$.subscribe(function (msg) {
            _this.snackBar.open(msg, 'x', { duration: 3000, extraClasses: ['warnBar'] });
        });
        this.height = this.winRef.getWindow().innerHeight + "px";
        this.winRef.getWindow().onresize = function (e) {
            _this.height = _this.winRef.getWindow().innerHeight + "px";
        };
        this.setBackgroundColor();
        this.nightMode = this.quranService.nightMode;
        this.quranService.nightMode$
            .subscribe(function (m) {
            _this.nightMode = m;
            _this.nightModeVar = _this.nightMode;
            _this.setBackgroundColor();
        });
        this.nightModeVar = this.quranService.nightMode;
        if (this.deviceService.getDeviceInfo().device === 'unknown')
            this.showLink = false;
        else {
            this.showLink = true;
            if (this.deviceService.getDeviceInfo().device === 'ios' || this.deviceService.getDeviceInfo().device === 'iphone')
                this.storeAddress = 'App Store';
            else if (this.deviceService.getDeviceInfo().device === 'android')
                this.storeAddress = 'Play Store';
            else
                this.storeAddress = 'Microsoft Store';
        }
        this.authService.user.subscribe(function (u) {
            if (u !== null && u.token !== null && u.token !== undefined) {
                _this.khatmService.loadKhatm(u.email);
                _this.khatmService.loadAllCommitments();
            }
        });
    };
    AppComponent.prototype.setBackgroundColor = function () {
        if (this.nightMode) {
            // document.body.style.color="white !important";
            // document.body.style.backgroundColor="black";
            this.color = "white";
            this.backgroundColor = "black";
        }
        else {
            // document.body.style.color="black";
            // document.body.style.backgroundColor="#faf6f3";
            this.color = "black";
            this.backgroundColor = "#faf6f3";
        }
    };
    AppComponent.prototype.openLink = function () {
        this.showLink = false;
    };
    return AppComponent;
}());
AppComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_12" /* Component */])({
        selector: 'app-root',
        template: __webpack_require__(539),
        styles: [__webpack_require__(512)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_3__quran_service__["a" /* QuranService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__quran_service__["a" /* QuranService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_4__msg_service__["a" /* MsgService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__msg_service__["a" /* MsgService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1__angular_material__["o" /* MdSnackBar */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_material__["o" /* MdSnackBar */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_5__windowRef__["a" /* WindowRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__windowRef__["a" /* WindowRef */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_2_ng2_device_detector__["b" /* Ng2DeviceService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2_ng2_device_detector__["b" /* Ng2DeviceService */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_6__auth_service__["a" /* AuthService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6__auth_service__["a" /* AuthService */]) === "function" && _f || Object, typeof (_g = typeof __WEBPACK_IMPORTED_MODULE_7__khatm_service__["a" /* KhatmService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_7__khatm_service__["a" /* KhatmService */]) === "function" && _g || Object])
], AppComponent);

var _a, _b, _c, _d, _e, _f, _g;
//# sourceMappingURL=C:/Users/ali71/WebstormProjects/quran-together/src/app.component.js.map

/***/ }),

/***/ 126:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__khatm_service__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__quran_service__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_material__ = __webpack_require__(48);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CommitmentComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};




var CommitmentComponent = (function () {
    function CommitmentComponent(khatmService, quranService, dialogRef, data) {
        this.khatmService = khatmService;
        this.quranService = quranService;
        this.dialogRef = dialogRef;
        this.data = data;
        this.isSelect = true;
        this.startRange = null;
        this.endRange = null;
        this.allCommitments = [];
        this.conditionalColoring = {
            background: 'normal_back',
            text: 'noraml_text',
            primary: 'normal_primary',
            secondary: 'normal_secondary'
        };
    }
    CommitmentComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.quranService.nightMode$.subscribe(function (data) {
            if (data) {
                _this.conditionalColoring.background = 'night_back';
                _this.conditionalColoring.text = 'night_text';
                _this.conditionalColoring.primary = 'night_primary';
                _this.conditionalColoring.secondary = 'night_secondary';
            }
            else {
                _this.conditionalColoring.background = 'normal_back';
                _this.conditionalColoring.text = 'normal_text';
                _this.conditionalColoring.primary = 'normal_primary';
                _this.conditionalColoring.secondary = 'normal_secondary';
            }
        });
        this.khatm = this.data.khatm;
        this.isSelect = this.data.isSelect;
        var value = this.khatmService.getKhatmPages(this.khatm.khid);
        this.allCommitments = value.sort(function (a, b) {
            if (a.page_number > b.page_number)
                return 1;
            else if (a.page_number < b.page_number)
                return -1;
            else {
                if (a.repeat_number > b.repeat_number)
                    return 1;
                else if (a.repeat_number < b.repeat_number)
                    return -1;
                else
                    return 0;
            }
        });
        this.dialogRef.afterClosed().subscribe(function (data) {
            if (_this.startRange !== null && _this.endRange === null) {
                //Submit startRange commitment
                _this.khatmService.commitPages(_this.khatm.khid, [_this.startRange], _this.startRange.isread);
            }
        }, function (err) {
            _this.startRange.isread = true;
            _this.khatm.you_read = (_this.startRange.isread) ? parseInt(_this.khatm.you_read) + 1 : parseInt(_this.khatm.you_read) - 1;
            _this.khatm.you_unread = (_this.startRange.isread) ? parseInt(_this.khatm.you_unread) - 1 : parseInt(_this.khatm.you_unread) + 1;
            _this.khatm.read_pages = (_this.startRange.isread) ? parseInt(_this.khatm.read_pages) + 1 : parseInt(_this.khatm.read_pages) - 1;
            _this.startRange = null;
        });
    };
    CommitmentComponent.prototype.commit = function (page) {
        if (this.startRange !== null)
            this.selectRange(page);
        else {
            page.isread = !page.isread;
            this.khatm.you_read = (page.isread) ? parseInt(this.khatm.you_read) + 1 : parseInt(this.khatm.you_read) - 1;
            this.khatm.you_unread = (page.isread) ? parseInt(this.khatm.you_unread) - 1 : parseInt(this.khatm.you_unread) + 1;
            this.khatm.read_pages = (page.isread) ? parseInt(this.khatm.read_pages) + 1 : parseInt(this.khatm.read_pages) - 1;
            this.khatmService.commitPages(this.khatm.khid, [page], page.isread);
        }
    };
    CommitmentComponent.prototype.selectRange = function (page) {
        var _this = this;
        if (this.startRange === null) {
            page.isread = true;
            this.khatm.you_read = (page.isread) ? parseInt(this.khatm.you_read) + 1 : parseInt(this.khatm.you_read) - 1;
            this.khatm.you_unread = (page.isread) ? parseInt(this.khatm.you_unread) - 1 : parseInt(this.khatm.you_unread) + 1;
            this.khatm.read_pages = (page.isread) ? parseInt(this.khatm.read_pages) + 1 : parseInt(this.khatm.read_pages) - 1;
            this.startRange = page;
        }
        else if (this.endRange === null)
            this.endRange = page;
        if (this.startRange !== null && this.endRange !== null) {
            //check the position of start/end range (change the position if needed)
            if (this.startRange.page_number > this.endRange.page_number) {
                var tmp = this.startRange;
                this.startRange = this.endRange;
                this.endRange = tmp;
                this.endRange.isread = false;
                this.startRange.isread = true;
            }
            else if (this.startRange.page_number === this.endRange.page_number) {
                if (this.startRange.repeat_number > this.endRange.repeat_number) {
                    var tmp = this.startRange;
                    this.startRange = this.endRange;
                    this.endRange = tmp;
                    this.endRange.isread = false;
                    this.startRange.isread = true;
                }
            }
            var pages_1 = [];
            pages_1.push(this.startRange);
            this.allCommitments.forEach(function (el) {
                if ((el.page_number > _this.startRange.page_number ||
                    (el.page_number === _this.startRange.page_number && el.repeat_number > _this.startRange.repeat_number)) &&
                    (el.page_number < _this.endRange.page_number ||
                        (el.page_number === _this.endRange.page_number && el.repeat_number <= _this.endRange.repeat_number))) {
                    el.isread = !el.isread;
                    _this.khatm.you_read = (el.isread) ? parseInt(_this.khatm.you_read) + 1 : parseInt(_this.khatm.you_read) - 1;
                    _this.khatm.you_unread = (el.isread) ? parseInt(_this.khatm.you_unread) - 1 : parseInt(_this.khatm.you_unread) + 1;
                    _this.khatm.read_pages = (el.isread) ? parseInt(_this.khatm.read_pages) + 1 : parseInt(_this.khatm.read_pages) - 1;
                    pages_1.push(el);
                }
            });
            var readPages = pages_1.filter(function (el) { return el.isread === true; });
            var unreadPages_1 = pages_1.filter(function (el) { return el.isread === false; });
            this.khatmService.commitPages(this.khatm.khid, readPages, true)
                .then(function (res) { return _this.khatmService.commitPages(_this.khatm.khid, unreadPages_1, false); })
                .catch(function (err) { return console.log(err); });
            this.startRange = null;
            this.endRange = null;
        }
    };
    return CommitmentComponent;
}());
CommitmentComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_12" /* Component */])({
        selector: 'app-commitment',
        template: __webpack_require__(541),
        styles: [__webpack_require__(514)]
    }),
    __param(3, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["g" /* Inject */])(__WEBPACK_IMPORTED_MODULE_3__angular_material__["l" /* MD_DIALOG_DATA */])),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__khatm_service__["a" /* KhatmService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__khatm_service__["a" /* KhatmService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__quran_service__["a" /* QuranService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__quran_service__["a" /* QuranService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__angular_material__["m" /* MdDialogRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__angular_material__["m" /* MdDialogRef */]) === "function" && _c || Object, Object])
], CommitmentComponent);

var _a, _b, _c;
//# sourceMappingURL=C:/Users/ali71/WebstormProjects/quran-together/src/commitment.component.js.map

/***/ }),

/***/ 127:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_moment_timezone__ = __webpack_require__(169);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_moment_timezone___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_moment_timezone__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_material__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__msg_service__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__khatm_service__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__quran_service__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__commitment_commitment_component__ = __webpack_require__(126);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return KhatmComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};

// import * as moment from 'moment';






var KhatmComponent = (function () {
    function KhatmComponent(msgService, khatmService, dialogRef, quranService, data, dialog) {
        this.msgService = msgService;
        this.khatmService = khatmService;
        this.dialogRef = dialogRef;
        this.quranService = quranService;
        this.data = data;
        this.dialog = dialog;
        this.basicShareLink = 'home/khatm/';
        this.khatmIsStarted = true;
        this.isSubmitted = false;
        this.name = '';
        this.description = '';
        this.ownerShown = true;
        this.range = 'whole';
        this.rangeDisplay = 'Whole Quran';
        this.suraNumber = 1;
        this.suras = [];
        this.repeats = 1;
        this.currentDate = new Date();
        this.startDate = null;
        this.endDate = null;
        this.isNew = false;
        this.submitDisability = true;
        this.lastFocus = 'start';
        this.endDateDisplay = '';
        this.rest_days = null;
        this.conditionalColoring = {
            background: 'normal_back',
            text: 'noraml_text',
            primary: 'normal_primary',
            secondary: 'normal_secondary'
        };
        this.isChangingCommitments = false;
        this.isLoading = false;
        this.suras = this.quranService.getAllSura();
    }
    KhatmComponent.prototype.ngOnInit = function () {
        this.startDate = this.currentDate.getFullYear() + '-' +
            this.getFormattedDate(this.currentDate.getMonth(), true) + '-' +
            this.getFormattedDate(this.currentDate.getDate(), false);
        this.isNew = this.data.isNew;
        this.khatm = this.data.khatm;
        if (this.khatm !== null) {
            this.endDateDisplay = __WEBPACK_IMPORTED_MODULE_1_moment_timezone__(this.khatm.end_date).format('YYYY-MMM-DD');
        }
    };
    KhatmComponent.prototype.submit = function () {
        this.rangeDisplay = (this.range === 'whole') ? 'Whole Quran' : 'Specific Sura';
        //Check validation
        if (this.name === null || this.name === '')
            this.msgService.warn('The khatm should have a name');
        else if (this.endDate === null)
            this.msgService.warn('The end date field cannot be empty');
        else if (this.endDate < this.startDate)
            this.msgService.warn('The start date cannot be later then end date');
        else if (this.range === 'sura' && (this.suraNumber === null || this.suraNumber === 0))
            this.msgService.warn('Please choose sura');
        else
            this.isSubmitted = true;
    };
    KhatmComponent.prototype.create = function () {
        var _this = this;
        var khatmData = {
            name: this.name,
            description: this.description,
            creator_shown: this.ownerShown,
            start_date: this.startDate,
            end_date: this.endDate,
            timezone: __WEBPACK_IMPORTED_MODULE_1_moment_timezone__["tz"](__WEBPACK_IMPORTED_MODULE_1_moment_timezone__["tz"].guess()).format('z'),
            specific_sura: (this.range === 'whole') ? null : this.suraNumber,
            repeats: this.repeats
        };
        this.khatmService.createKhatm(khatmData)
            .then(function (res) {
            _this.msgService.message('Your khatm created successfully');
            _this.dialogRef.close();
        })
            .catch(function (err) {
            _this.msgService.warn('Cannot save your khamt now. Please try again');
        });
    };
    KhatmComponent.prototype.getFormattedDate = function (num, isMonth) {
        var n = isMonth ? num + 1 : num;
        if (n >= 1 && n <= 9)
            return '0' + n.toString();
        else
            return n.toString();
    };
    KhatmComponent.prototype.checkDisability = function () {
        if (this.name.trim() === '' || this.name === null)
            this.submitDisability = true;
        else if (this.repeats < 0)
            this.submitDisability = true;
        else if (this.endDate === undefined || this.endDate === null || (this.endDate < this.startDate))
            this.submitDisability = true;
        else
            this.submitDisability = false;
    };
    KhatmComponent.prototype.changeDuration = function (currentFocus, newVal) {
        var currentDate = __WEBPACK_IMPORTED_MODULE_1_moment_timezone__(this.currentDate);
        var startDate = (currentFocus === 'start') ? __WEBPACK_IMPORTED_MODULE_1_moment_timezone__(newVal) : __WEBPACK_IMPORTED_MODULE_1_moment_timezone__(this.startDate);
        var endDate = (currentFocus === 'end') ? __WEBPACK_IMPORTED_MODULE_1_moment_timezone__(newVal) : __WEBPACK_IMPORTED_MODULE_1_moment_timezone__(this.endDate);
        //Check start date validation
        if (this.isFirstLess(startDate, currentDate)) {
            this.startDate = this.castDate(currentDate);
            this.msgService.warn('Please choose valid start date');
            this.submitDisability = true;
            return;
        }
        //Check all date validation
        if (!__WEBPACK_IMPORTED_MODULE_1_moment_timezone__(this.startDate).isValid) {
            this.msgService.warn('Please choose the valid start date');
            this.startDate = null;
            this.submitDisability = true;
            return;
        }
        else if (!__WEBPACK_IMPORTED_MODULE_1_moment_timezone__(this.endDate).isValid) {
            this.msgService.warn('Please choose the valid end date');
            this.endDate = null;
            this.submitDisability = true;
            return;
        }
        if (this.lastFocus === 'start') {
            if (currentFocus === 'start') {
                if (this.isFirstLess(startDate, currentDate)) {
                    this.startDate = this.castDate(currentDate);
                    this.msgService.warn('Please choose valid start date');
                    this.submitDisability = true;
                    return;
                }
                if (this.duration !== null && this.duration !== '')
                    this.startDate = this.castDate(this.getDate(this.startDate, this.duration, null));
            }
            else if (currentFocus === 'end') {
                if (this.isFirstLess(endDate, startDate)) {
                    this.endDate = null;
                    this.msgService.warn('Please choose valid end date');
                    this.submitDisability = true;
                    return;
                }
                else
                    this.duration = this.getDate(startDate, null, endDate);
            }
            else if (currentFocus === 'duration') {
                if (this.duration !== null && this.duration !== '') {
                    if (this.duration > (365 * 10)) {
                        this.duration = null;
                        this.msgService.warn('The duration cannot be greater than 10 years');
                        this.submitDisability = true;
                        return;
                    }
                    else
                        this.endDate = this.castDate(this.getDate(startDate, this.duration, null));
                }
            }
        }
        else if (this.lastFocus === 'end') {
            if (currentFocus === 'start') {
                if (this.isFirstLess(startDate, currentDate)) {
                    this.startDate = this.castDate(currentDate);
                    this.msgService.warn('Please choose valid start date');
                    this.submitDisability = true;
                    return;
                }
                else
                    this.duration = this.getDate(startDate, null, endDate);
            }
            else if (currentFocus === 'end') {
                if (this.isFirstLess(endDate, currentDate)) {
                    this.endDate = null;
                    this.msgService.warn('Please choose valid end date');
                    this.submitDisability = true;
                    return;
                }
                else
                    this.duration = this.getDate(startDate, null, endDate);
            }
            else if (currentFocus === 'duration') {
                if (this.duration !== null && this.duration !== '') {
                    if (this.duration < 0) {
                        this.duration = null;
                        this.msgService.warn('The duration value cannot be negative');
                        this.submitDisability = true;
                        return;
                    }
                    else {
                        var tempStartDate = this.getDate(null, this.duration, endDate);
                        if (this.isFirstLess(tempStartDate, currentDate)) {
                            this.startDate = this.castDate(currentDate);
                            this.endDate = this.castDate(endDate.add(currentDate.diff(tempStartDate, 'days'), 'days'));
                        }
                        else
                            this.startDate = this.castDate(tempStartDate);
                    }
                }
            }
        }
        else if (this.lastFocus === 'duration') {
            if (currentFocus === 'start') {
                if (this.isFirstLess(startDate, currentDate)) {
                    this.msgService.warn('The start date cannot be less than current date');
                    this.startDate = this.castDate(currentDate);
                    this.submitDisability = true;
                    return;
                }
                else if (this.duration !== null && this.duration !== '')
                    this.endDate = this.castDate(this.getDate(startDate, this.duration, null));
            }
            else if (currentFocus === 'end') {
                if (this.isFirstLess(endDate, currentDate)) {
                    this.endDate = null;
                    this.msgService.warn('The end date cannot be less than current date');
                    this.submitDisability = true;
                    return;
                }
                else if (this.duration !== null && this.duration !== '') {
                    var tempStartDate = this.getDate(null, this.duration, endDate);
                    if (this.isFirstLess(tempStartDate, currentDate)) {
                        this.startDate = this.castDate(currentDate);
                        this.endDate = this.castDate(endDate.add(currentDate.diff(tempStartDate, 'days'), 'days'));
                    }
                    else
                        this.startDate = this.castDate(tempStartDate);
                }
            }
            else if (currentFocus === 'duration') {
                if (this.duration !== null && this.duration !== '') {
                    if (this.duration < 0) {
                        this.msgService.warn('The duration value cannot be negative');
                        this.duration = null;
                        this.submitDisability = true;
                        return;
                    }
                    else
                        this.endDate = this.castDate(this.getDate(startDate, this.duration, null));
                }
            }
        }
        this.checkDisability();
    };
    KhatmComponent.prototype.getDate = function (startDate, duration, endDate) {
        if (startDate === null) {
            var e = __WEBPACK_IMPORTED_MODULE_1_moment_timezone__(endDate);
            var s = e.subtract(duration, 'days');
            return s;
        }
        else if (duration === null) {
            var s = __WEBPACK_IMPORTED_MODULE_1_moment_timezone__(startDate);
            var e = __WEBPACK_IMPORTED_MODULE_1_moment_timezone__(endDate);
            return e.diff(s, 'days');
        }
        else if (endDate === null) {
            var s = __WEBPACK_IMPORTED_MODULE_1_moment_timezone__(startDate);
            var e = s.add(duration, 'days');
            return e;
        }
        return null;
    };
    KhatmComponent.prototype.castDate = function (a) {
        var date = new Date(a.toObject().years, a.toObject().months, a.toObject().date);
        return date.getFullYear() + '-' + this.getFormattedDate(date.getMonth(), true) + '-' + this.getFormattedDate(date.getDate(), false);
    };
    KhatmComponent.prototype.copyLink = function () {
        var link = 'http://quranApp/' + this.basicShareLink + this.khatm.share_link;
        // this.clipboard.copy(link);
    };
    KhatmComponent.prototype.shareVia = function () {
        var message = 'Join to this khatm\n';
        var link = 'quranApp://' + this.basicShareLink + this.khatm.share_link;
        var tlink = '<html><head></head><body><a>' + this.basicShareLink + this.khatm.share_link + '</a></body></html>';
        // this.socialSharing.share(message + '\n' + link, 'Khatm share link', null, tlink)
        //   .then((res) => {
        //     console.log(res);
        //   })
        //   .catch((err) => {
        //     console.log(err.message);
        //   });
    };
    KhatmComponent.prototype.changeCommitPages = function (data) {
        var _this = this;
        var newVal = data.target.value;
        var newValNum = parseInt(newVal);
        if (newVal.toString() === '')
            newValNum = 0;
        if (newVal !== null && newVal !== undefined && newValNum !== this.khatm.you_unread) {
            //Start loading controller
            this.isLoading = true;
            //update commit page for khatm
            var type = (newValNum < (this.khatm.you_unread === null ? 0 : this.khatm.you_unread)) ? 'delete' : 'add';
            this.khatmService.getPages(newValNum, this.khatm.khid, type)
                .then(function (res) {
                _this.khatm.you_unread = (newValNum === 0) ? null : newValNum;
                _this.khatm.you_read = (_this.khatm.you_read === null) ? 0 : _this.khatm.you_read;
                //Stop loading controller
                _this.isLoading = false;
                _this.isChangingCommitments = false;
                _this.msgService.message('The requested pages assigned to you');
            })
                .catch(function (err) {
                //Stop loading controller
                _this.isLoading = false;
                _this.isChangingCommitments = false;
                console.log(err.message);
                _this.msgService.warn('Cannot assing you requested pages');
            });
        }
        else
            this.isChangingCommitments = false;
    };
    KhatmComponent.prototype.goToCommitment = function (isSelect) {
        // this.dialogRef.close();
        var dialogRef = this.dialog.open(__WEBPACK_IMPORTED_MODULE_6__commitment_commitment_component__["a" /* CommitmentComponent */], {
            height: '500px',
            width: '400px',
            data: {
                isSelect: isSelect,
                khatm: this.khatm
            }
        });
    };
    KhatmComponent.prototype.start_stop_Khatm = function () {
        this.khatmService.start_stop_Khatm(this.khatm);
        if (this.khatmService.activeKhatm.getValue() !== null)
            this.dialogRef.close();
    };
    KhatmComponent.prototype.isFirstLess = function (aDate, bDate) {
        return aDate.diff(bDate, 'days') < 0 ? true : false;
    };
    KhatmComponent.prototype.limitClick = function () {
        this.isChangingCommitments = true;
    };
    return KhatmComponent;
}());
KhatmComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_12" /* Component */])({
        selector: 'app-khatm',
        template: __webpack_require__(542),
        styles: [__webpack_require__(515)]
    }),
    __param(4, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["g" /* Inject */])(__WEBPACK_IMPORTED_MODULE_2__angular_material__["l" /* MD_DIALOG_DATA */])),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_3__msg_service__["a" /* MsgService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__msg_service__["a" /* MsgService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_4__khatm_service__["a" /* KhatmService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__khatm_service__["a" /* KhatmService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__angular_material__["m" /* MdDialogRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_material__["m" /* MdDialogRef */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_5__quran_service__["a" /* QuranService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__quran_service__["a" /* QuranService */]) === "function" && _d || Object, Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_2__angular_material__["n" /* MdDialog */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_material__["n" /* MdDialog */]) === "function" && _e || Object])
], KhatmComponent);

var _a, _b, _c, _d, _e;
//# sourceMappingURL=C:/Users/ali71/WebstormProjects/quran-together/src/khatm.component.js.map

/***/ }),

/***/ 128:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return QuranReference; });
/* unused harmony export TanzilLocation */
/* unused harmony export Sura */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return QuranSection; });
/* unused harmony export QuranTelavat */
/* unused harmony export QuranSections */
/* unused harmony export QuranSajda */
/* unused harmony export QuranData */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return QURAN_DATA; });
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
// Quran Metadata (ver 1.0)
// Copyright (C) 2008-2009 Tanzil.info
// License: Creative Commons Attribution 3.0
var QuranReference = (function () {
    function QuranReference(obj) {
        if (obj === void 0) { obj = { sura: 0, aya: 0 }; }
        this.sura = obj.sura;
        this.aya = obj.aya;
    }
    return QuranReference;
}());

var TanzilLocation;
(function (TanzilLocation) {
    TanzilLocation[TanzilLocation["Meccan"] = 0] = "Meccan";
    TanzilLocation[TanzilLocation["Medinan"] = 1] = "Medinan";
})(TanzilLocation || (TanzilLocation = {}));
var Sura = (function () {
    function Sura() {
    }
    Sura.prototype.init = function (input, ind) {
        this.tanzilOrder = input[2];
        this.rukus = input[3];
        this.name = input[4];
        this.englishName = input[5];
        this.tanzilLocation = input[7];
        this.order = ind + 1;
        this.ayas = input[1];
    };
    return Sura;
}());

var QuranSection = (function () {
    function QuranSection() {
    }
    return QuranSection;
}());

var QuranTelavat = (function () {
    function QuranTelavat(initObj) {
        if (initObj === void 0) { initObj = {}; }
        var _this = this;
        ['bitrate', 'name', 'subfolder'].forEach(function (el) { return _this[el] = initObj[el] ? initObj[el] : ''; });
        this.qualityNamer();
    }
    QuranTelavat.prototype.qualityNamer = function () {
        var q = parseInt(this.bitrate);
        if (q < 32)
            this.quality = "Telephone";
        else if (q < 64)
            this.quality = "AM Radio";
        else if (q < 128)
            this.quality = "FM Radio";
        else
            this.quality = "CD";
    };
    return QuranTelavat;
}());

var QuranSections = (function (_super) {
    __extends(QuranSections, _super);
    function QuranSections() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return QuranSections;
}(Array));

var QuranSajda = (function () {
    function QuranSajda() {
    }
    return QuranSajda;
}());

var QuranData = (function () {
    function QuranData() {
        this.suras = new Array();
        this.qhizb = new QuranSections();
        this.hizb = new QuranSections();
        this.manzil = new QuranSections();
        this.ruku = new QuranSections();
        this.juz = new QuranSections();
        this.page = new QuranSections();
        this.halfPage = new QuranSections();
        this.sajda = new Array();
        this.tartilInfo = new Array();
        this.endJuzPage = [21, 41, 61, 81, 101, 120, 141, 161, 181, 200, 221, 241, 261, 281, 301, 321, 341, 361, 381, 401, 421, 441, 461, 481, 501, 521, 541, 561, 581, 604];
        this.suraBismillah = [81, 83, 84, 85, 87, 88, 89, 90, 92, 94, 96, 98, 100, 102, 105, 108, 111, 113];
    }
    return QuranData;
}());

var quranData = new QuranData();
//------------------ Sura Data ---------------------
[
    // [start, ayas, order, rukus, name, tname, ename, type]
    [0, 7, 5, 1, 'الفاتحة', "Al-Faatiha", 'The Opening', 'Meccan'],
    [7, 286, 87, 40, 'البقرة', "Al-Baqara", 'The Cow', 'Medinan'],
    [293, 200, 89, 20, 'آل عمران', "Aal-i-Imraan", 'The Family of Imraan', 'Medinan'],
    [493, 176, 92, 24, 'النساء', "An-Nisaa", 'The Women', 'Medinan'],
    [669, 120, 112, 16, 'المائدة', "Al-Maaida", 'The Table', 'Medinan'],
    [789, 165, 55, 20, 'الأنعام', "Al-An'aam", 'The Cattle', 'Meccan'],
    [954, 206, 39, 24, 'الأعراف', "Al-A'raaf", 'The Heights', 'Meccan'],
    [1160, 75, 88, 10, 'الأنفال', "Al-Anfaal", 'The Spoils of War', 'Medinan'],
    [1235, 129, 113, 16, 'التوبة', "At-Tawba", 'The Repentance', 'Medinan'],
    [1364, 109, 51, 11, 'يونس', "Yunus", 'Jonas', 'Meccan'],
    [1473, 123, 52, 10, 'هود', "Hud", 'Hud', 'Meccan'],
    [1596, 111, 53, 12, 'يوسف', "Yusuf", 'Joseph', 'Meccan'],
    [1707, 43, 96, 6, 'الرعد', "Ar-Ra'd", 'The Thunder', 'Medinan'],
    [1750, 52, 72, 7, 'ابراهيم', "Ibrahim", 'Abraham', 'Meccan'],
    [1802, 99, 54, 6, 'الحجر', "Al-Hijr", 'The Rock', 'Meccan'],
    [1901, 128, 70, 16, 'النحل', "An-Nahl", 'The Bee', 'Meccan'],
    [2029, 111, 50, 12, 'الإسراء', "Al-Israa", 'The Night Journey', 'Meccan'],
    [2140, 110, 69, 12, 'الكهف', "Al-Kahf", 'The Cave', 'Meccan'],
    [2250, 98, 44, 6, 'مريم', "Maryam", 'Mary', 'Meccan'],
    [2348, 135, 45, 8, 'طه', "Taa-Haa", 'Taa-Haa', 'Meccan'],
    [2483, 112, 73, 7, 'الأنبياء', "Al-Anbiyaa", 'The Prophets', 'Meccan'],
    [2595, 78, 103, 10, 'الحج', "Al-Hajj", 'The Pilgrimage', 'Medinan'],
    [2673, 118, 74, 6, 'المؤمنون', "Al-Muminoon", 'The Believers', 'Meccan'],
    [2791, 64, 102, 9, 'النور', "An-Noor", 'The Light', 'Medinan'],
    [2855, 77, 42, 6, 'الفرقان', "Al-Furqaan", 'The Criterion', 'Meccan'],
    [2932, 227, 47, 11, 'الشعراء', "Ash-Shu'araa", 'The Poets', 'Meccan'],
    [3159, 93, 48, 7, 'النمل', "An-Naml", 'The Ant', 'Meccan'],
    [3252, 88, 49, 8, 'القصص', "Al-Qasas", 'The Stories', 'Meccan'],
    [3340, 69, 85, 7, 'العنكبوت', "Al-Ankaboot", 'The Spider', 'Meccan'],
    [3409, 60, 84, 6, 'الروم', "Ar-Room", 'The Romans', 'Meccan'],
    [3469, 34, 57, 3, 'لقمان', "Luqman", 'Luqman', 'Meccan'],
    [3503, 30, 75, 3, 'السجدة', "As-Sajda", 'The Prostration', 'Meccan'],
    [3533, 73, 90, 9, 'الأحزاب', "Al-Ahzaab", 'The Clans', 'Medinan'],
    [3606, 54, 58, 6, 'سبإ', "Saba", 'Sheba', 'Meccan'],
    [3660, 45, 43, 5, 'فاطر', "Faatir", 'The Originator', 'Meccan'],
    [3705, 83, 41, 5, 'يس', "Yaseen", 'Yaseen', 'Meccan'],
    [3788, 182, 56, 5, 'الصافات', "As-Saaffaat", 'Those drawn up in Ranks', 'Meccan'],
    [3970, 88, 38, 5, 'ص', "Saad", 'The letter Saad', 'Meccan'],
    [4058, 75, 59, 8, 'الزمر', "Az-Zumar", 'The Groups', 'Meccan'],
    [4133, 85, 60, 9, 'غافر', "Al-Ghaafir", 'The Forgiver', 'Meccan'],
    [4218, 54, 61, 6, 'فصلت', "Fussilat", 'Explained in detail', 'Meccan'],
    [4272, 53, 62, 5, 'الشورى', "Ash-Shura", 'Consultation', 'Meccan'],
    [4325, 89, 63, 7, 'الزخرف', "Az-Zukhruf", 'Ornaments of gold', 'Meccan'],
    [4414, 59, 64, 3, 'الدخان', "Ad-Dukhaan", 'The Smoke', 'Meccan'],
    [4473, 37, 65, 4, 'الجاثية', "Al-Jaathiya", 'Crouching', 'Meccan'],
    [4510, 35, 66, 4, 'الأحقاف', "Al-Ahqaf", 'The Dunes', 'Meccan'],
    [4545, 38, 95, 4, 'محمد', "Muhammad", 'Muhammad', 'Medinan'],
    [4583, 29, 111, 4, 'الفتح', "Al-Fath", 'The Victory', 'Medinan'],
    [4612, 18, 106, 2, 'الحجرات', "Al-Hujuraat", 'The Inner Apartments', 'Medinan'],
    [4630, 45, 34, 3, 'ق', "Qaaf", 'The letter Qaaf', 'Meccan'],
    [4675, 60, 67, 3, 'الذاريات', "Adh-Dhaariyat", 'The Winnowing Winds', 'Meccan'],
    [4735, 49, 76, 2, 'الطور', "At-Tur", 'The Mount', 'Meccan'],
    [4784, 62, 23, 3, 'النجم', "An-Najm", 'The Star', 'Meccan'],
    [4846, 55, 37, 3, 'القمر', "Al-Qamar", 'The Moon', 'Meccan'],
    [4901, 78, 97, 3, 'الرحمن', "Ar-Rahmaan", 'The Beneficent', 'Medinan'],
    [4979, 96, 46, 3, 'الواقعة', "Al-Waaqia", 'The Inevitable', 'Meccan'],
    [5075, 29, 94, 4, 'الحديد', "Al-Hadid", 'The Iron', 'Medinan'],
    [5104, 22, 105, 3, 'المجادلة', "Al-Mujaadila", 'The Pleading Woman', 'Medinan'],
    [5126, 24, 101, 3, 'الحشر', "Al-Hashr", 'The Exile', 'Medinan'],
    [5150, 13, 91, 2, 'الممتحنة', "Al-Mumtahana", 'She that is to be examined', 'Medinan'],
    [5163, 14, 109, 2, 'الصف', "As-Saff", 'The Ranks', 'Medinan'],
    [5177, 11, 110, 2, 'الجمعة', "Al-Jumu'a", 'Friday', 'Medinan'],
    [5188, 11, 104, 2, 'المنافقون', "Al-Munaafiqoon", 'The Hypocrites', 'Medinan'],
    [5199, 18, 108, 2, 'التغابن', "At-Taghaabun", 'Mutual Disillusion', 'Medinan'],
    [5217, 12, 99, 2, 'الطلاق', "At-Talaaq", 'Divorce', 'Medinan'],
    [5229, 12, 107, 2, 'التحريم', "At-Tahrim", 'The Prohibition', 'Medinan'],
    [5241, 30, 77, 2, 'الملك', "Al-Mulk", 'The Sovereignty', 'Meccan'],
    [5271, 52, 2, 2, 'القلم', "Al-Qalam", 'The Pen', 'Meccan'],
    [5323, 52, 78, 2, 'الحاقة', "Al-Haaqqa", 'The Reality', 'Meccan'],
    [5375, 44, 79, 2, 'المعارج', "Al-Ma'aarij", 'The Ascending Stairways', 'Meccan'],
    [5419, 28, 71, 2, 'نوح', "Nooh", 'Noah', 'Meccan'],
    [5447, 28, 40, 2, 'الجن', "Al-Jinn", 'The Jinn', 'Meccan'],
    [5475, 20, 3, 2, 'المزمل', "Al-Muzzammil", 'The Enshrouded One', 'Meccan'],
    [5495, 56, 4, 2, 'المدثر', "Al-Muddaththir", 'The Cloaked One', 'Meccan'],
    [5551, 40, 31, 2, 'القيامة', "Al-Qiyaama", 'The Resurrection', 'Meccan'],
    [5591, 31, 98, 2, 'الانسان', "Al-Insaan", 'Man', 'Medinan'],
    [5622, 50, 33, 2, 'المرسلات', "Al-Mursalaat", 'The Emissaries', 'Meccan'],
    [5672, 40, 80, 2, 'النبإ', "An-Naba", 'The Announcement', 'Meccan'],
    [5712, 46, 81, 2, 'النازعات', "An-Naazi'aat", 'Those who drag forth', 'Meccan'],
    [5758, 42, 24, 1, 'عبس', "Abasa", 'He frowned', 'Meccan'],
    [5800, 29, 7, 1, 'التكوير', "At-Takwir", 'The Overthrowing', 'Meccan'],
    [5829, 19, 82, 1, 'الإنفطار', "Al-Infitaar", 'The Cleaving', 'Meccan'],
    [5848, 36, 86, 1, 'المطففين', "Al-Mutaffifin", 'Defrauding', 'Meccan'],
    [5884, 25, 83, 1, 'الإنشقاق', "Al-Inshiqaaq", 'The Splitting Open', 'Meccan'],
    [5909, 22, 27, 1, 'البروج', "Al-Burooj", 'The Constellations', 'Meccan'],
    [5931, 17, 36, 1, 'الطارق', "At-Taariq", 'The Morning Star', 'Meccan'],
    [5948, 19, 8, 1, 'الأعلى', "Al-A'laa", 'The Most High', 'Meccan'],
    [5967, 26, 68, 1, 'الغاشية', "Al-Ghaashiya", 'The Overwhelming', 'Meccan'],
    [5993, 30, 10, 1, 'الفجر', "Al-Fajr", 'The Dawn', 'Meccan'],
    [6023, 20, 35, 1, 'البلد', "Al-Balad", 'The City', 'Meccan'],
    [6043, 15, 26, 1, 'الشمس', "Ash-Shams", 'The Sun', 'Meccan'],
    [6058, 21, 9, 1, 'الليل', "Al-Lail", 'The Night', 'Meccan'],
    [6079, 11, 11, 1, 'الضحى', "Ad-Dhuhaa", 'The Morning Hours', 'Meccan'],
    [6090, 8, 12, 1, 'الشرح', "Ash-Sharh", 'The Consolation', 'Meccan'],
    [6098, 8, 28, 1, 'التين', "At-Tin", 'The Fig', 'Meccan'],
    [6106, 19, 1, 1, 'العلق', "Al-Alaq", 'The Clot', 'Meccan'],
    [6125, 5, 25, 1, 'القدر', "Al-Qadr", 'The Power, Fate', 'Meccan'],
    [6130, 8, 100, 1, 'البينة', "Al-Bayyina", 'The Evidence', 'Medinan'],
    [6138, 8, 93, 1, 'الزلزلة', "Az-Zalzala", 'The Earthquake', 'Medinan'],
    [6146, 11, 14, 1, 'العاديات', "Al-Aadiyaat", 'The Chargers', 'Meccan'],
    [6157, 11, 30, 1, 'القارعة', "Al-Qaari'a", 'The Calamity', 'Meccan'],
    [6168, 8, 16, 1, 'التكاثر', "At-Takaathur", 'Competition', 'Meccan'],
    [6176, 3, 13, 1, 'العصر', "Al-Asr", 'The Declining Day, Epoch', 'Meccan'],
    [6179, 9, 32, 1, 'الهمزة', "Al-Humaza", 'The Traducer', 'Meccan'],
    [6188, 5, 19, 1, 'الفيل', "Al-Fil", 'The Elephant', 'Meccan'],
    [6193, 4, 29, 1, 'قريش', "Quraish", 'Quraysh', 'Meccan'],
    [6197, 7, 17, 1, 'الماعون', "Al-Maa'un", 'Almsgiving', 'Meccan'],
    [6204, 3, 15, 1, 'الكوثر', "Al-Kawthar", 'Abundance', 'Meccan'],
    [6207, 6, 18, 1, 'الكافرون', "Al-Kaafiroon", 'The Disbelievers', 'Meccan'],
    [6213, 3, 114, 1, 'النصر', "An-Nasr", 'Divine Support', 'Medinan'],
    [6216, 5, 6, 1, 'المسد', "Al-Masad", 'The Palm Fibre', 'Meccan'],
    [6221, 4, 22, 1, 'الإخلاص', "Al-Ikhlaas", 'Sincerity', 'Meccan'],
    [6225, 5, 20, 1, 'الفلق', "Al-Falaq", 'The Dawn', 'Meccan'],
    [6230, 6, 21, 1, 'الناس', "An-Naas", 'Mankind', 'Meccan'],
].forEach(function (el, ind) {
    var s = new Sura();
    s.init(el, ind);
    quranData.suras.push(s);
});
var tartilInfo;
tartilInfo = [
    {
        subfolder: "Abdul_Basit_Murattal_64kbps",
        name: "Abdul Basit Murattal",
        bitrate: "64kbps"
    },
    {
        subfolder: "Abdul_Basit_Murattal_192kbps",
        name: "Abdul Basit Murattal",
        bitrate: "192kbps"
    },
    {
        subfolder: "Abdul_Basit_Mujawwad_128kbps",
        name: "Abdul Basit Mujawwad",
        bitrate: "128kbps"
    },
    {
        subfolder: "Abdullah_Basfar_32kbps",
        name: "Abdullah Basfar",
        bitrate: "32kbps"
    },
    {
        subfolder: "Abdullah_Basfar_64kbps",
        name: "Abdullah Basfar",
        bitrate: "64kbps"
    },
    {
        subfolder: "Abdullah_Basfar_192kbps",
        name: "Abdullah Basfar",
        bitrate: "192kbps"
    },
    {
        subfolder: "Abdurrahmaan_As-Sudais_64kbps",
        name: "Abdurrahmaan As-Sudais",
        bitrate: "64kbps"
    },
    {
        subfolder: "Abdurrahmaan_As-Sudais_192kbps",
        name: "Abdurrahmaan As-Sudais",
        bitrate: "192kbps"
    },
    {
        subfolder: "AbdulSamad_64kbps_QuranExplorer.Com",
        name: "AbdulSamad QuranExplorer.Com",
        bitrate: "64kbps"
    },
    {
        subfolder: "Abu_Bakr_Ash-Shaatree_64kbps",
        name: "Abu Bakr Ash-Shaatree",
        bitrate: "64kbps"
    },
    {
        subfolder: "Abu_Bakr_Ash-Shaatree_128kbps",
        name: "Abu Bakr Ash-Shaatree",
        bitrate: "128kbps"
    },
    {
        subfolder: "Ahmed_ibn_Ali_al-Ajamy_64kbps_QuranExplorer.Com",
        name: "Ahmed ibn Ali al-Ajamy QuranExplorer.Com",
        bitrate: "64kbps"
    },
    {
        subfolder: "Ahmed_ibn_Ali_al-Ajamy_128kbps_ketaballah.net",
        name: "Ahmed ibn Ali al-Ajamy KetabAllah.Net",
        bitrate: "128kbps"
    },
    {
        subfolder: "Alafasy_64kbps",
        name: "Alafasy",
        bitrate: "64kbps"
    },
    {
        subfolder: "Alafasy_128kbps",
        name: "Alafasy",
        bitrate: "128kbps"
    },
    {
        subfolder: "Ghamadi_40kbps",
        name: "Ghamadi",
        bitrate: "40kbps"
    },
    {
        subfolder: "Hani_Rifai_64kbps",
        name: "Hani Rifai",
        bitrate: "64kbps"
    },
    {
        subfolder: "Hani_Rifai_192kbps",
        name: "Hani Rifai",
        bitrate: "192kbps"
    },
    {
        subfolder: "Husary_64kbps",
        name: "Husary",
        bitrate: "64kbps"
    },
    {
        subfolder: "Husary_128kbps",
        name: "Husary",
        bitrate: "128kbps"
    },
    {
        subfolder: "Husary_Mujawwad_64kbps",
        name: "Husary Mujawwad",
        bitrate: "64kbps"
    },
    {
        subfolder: "Husary_128kbps_Mujawwad",
        name: "Husary Mujawwad",
        bitrate: "128kbps"
    },
    {
        subfolder: "Hudhaify_32kbps",
        name: "Hudhaify",
        bitrate: "32kbps"
    },
    {
        subfolder: "Hudhaify_64kbps",
        name: "Hudhaify",
        bitrate: "64kbps"
    },
    {
        subfolder: "Hudhaify_128kbps",
        name: "Hudhaify",
        bitrate: "128kbps"
    },
    {
        subfolder: "Ibrahim_Akhdar_32kbps",
        name: "Ibrahim Akhdar",
        bitrate: "32kbps"
    },
    {
        subfolder: "Ibrahim_Akhdar_64kbps",
        name: "Ibrahim Akhdar",
        bitrate: "64kbps"
    },
    {
        subfolder: "Maher_AlMuaiqly_64kbps",
        name: "Maher Al Muaiqly",
        bitrate: "64kbps"
    },
    {
        subfolder: "MaherAlMuaiqly128kbps",
        name: "Maher Al Muaiqly",
        bitrate: "128kbps"
    },
    {
        subfolder: "Menshawi_16kbps",
        name: "Menshawi",
        bitrate: "16kbps"
    },
    {
        subfolder: "Menshawi_32kbps",
        name: "Menshawi",
        bitrate: "32kbps"
    },
    {
        subfolder: "Minshawy_Mujawwad_64kbps",
        name: "Minshawy Mujawwad",
        bitrate: "64kbps"
    },
    {
        subfolder: "Minshawy_Mujawwad_192kbps",
        name: "Minshawy Mujawwad",
        bitrate: "192kbps"
    },
    {
        subfolder: "Minshawy_Murattal_128kbps",
        name: "Minshawy Murattal",
        bitrate: "128kbps"
    },
    {
        subfolder: "Mohammad_al_Tablaway_64kbps",
        name: "Mohammad al Tablaway",
        bitrate: "64kbps"
    },
    {
        subfolder: "Mohammad_al_Tablaway_128kbps",
        name: "Mohammad al Tablaway",
        bitrate: "128kbps"
    },
    {
        subfolder: "Muhammad_Ayyoub_128kbps",
        name: "Muhammad Ayyoub",
        bitrate: "128kbps"
    },
    {
        subfolder: "Muhammad_Ayyoub_64kbps",
        name: "Muhammad Ayyoub",
        bitrate: "64kbps"
    },
    {
        subfolder: "Muhammad_Ayyoub_32kbps",
        name: "Muhammad Ayyoub",
        bitrate: "32kbps"
    },
    {
        subfolder: "Muhammad_Jibreel_64kbps",
        name: "Muhammad Jibreel",
        bitrate: "64kbps"
    },
    {
        subfolder: "Muhammad_Jibreel_128kbps",
        name: "Muhammad Jibreel",
        bitrate: "128kbps"
    },
    {
        subfolder: "Mustafa_Ismail_48kbps",
        name: "Mustafa Ismail",
        bitrate: "48kbps"
    },
    {
        subfolder: "Saood_ash-Shuraym_64kbps",
        name: "Saood bin Ibraaheem Ash-Shuraym",
        bitrate: "64kbps"
    },
    {
        subfolder: "Saood_ash-Shuraym_128kbps",
        name: "Saood bin Ibraaheem Ash-Shuraym",
        bitrate: "128kbps"
    },
    {
        subfolder: "English/Sahih_Intnl_Ibrahim_Walk_192kbps",
        name: "(English) Translated by Sahih International Recited by Ibrahim Walk",
        bitrate: "192kbps"
    },
    {
        subfolder: "MultiLanguage/Basfar_Walk_192kbps",
        name: "MultiLanguage/Basfar Walk",
        bitrate: "192kbps"
    },
    {
        subfolder: "translations/Makarem_Kabiri_16Kbps",
        name: "(Persian) Translated by Makarem Recited by Kabiri",
        bitrate: "64Kbps"
    },
    {
        subfolder: "translations/Fooladvand_Hedayatfar_40Kbps",
        name: "(Persian) Translated by Fooladvand Recited by Hedayatfar",
        bitrate: "64Kbps"
    },
    {
        subfolder: "Parhizgar_48kbps",
        name: "Parhizgar_64Kbps",
        bitrate: "64Kbps"
    },
    {
        subfolder: "translations/azerbaijani/balayev",
        name: "Balayev",
        bitrate: "64Kbps"
    },
    {
        subfolder: "Salaah_AbdulRahman_Bukhatir_128kbps",
        name: "Salaah AbdulRahman Bukhatir",
        bitrate: "128kbps"
    },
    {
        subfolder: "Muhsin_Al_Qasim_192kbps",
        name: "Muhsin Al Qasim",
        bitrate: "192kbps"
    },
    {
        subfolder: "Abdullaah_3awwaad_Al-Juhaynee_128kbps",
        name: "Abdullaah 3awwaad Al-Juhaynee",
        bitrate: "128kbps"
    },
    {
        subfolder: "Salah_Al_Budair_128kbps",
        name: "Salah Al Budair",
        bitrate: "128kbps"
    },
    {
        subfolder: "Abdullah_Matroud_128kbps",
        name: "Abdullah Matroud",
        bitrate: "128kbps"
    },
    {
        subfolder: "Ahmed_Neana_128kbps",
        name: "Ahmed Neana",
        bitrate: "128kbps"
    },
    {
        subfolder: "Muhammad_AbdulKareem_128kbps",
        name: "Muhammad AbdulKareem",
        bitrate: "128kbps"
    },
    {
        subfolder: "khalefa_al_tunaiji_64kbps",
        name: "Khalefa Al-Tunaiji",
        bitrate: "64kbps"
    },
    {
        subfolder: "mahmoud_ali_al_banna_32kbps",
        name: "Mahmoud Ali Al-Banna",
        bitrate: "32kbps"
    },
    {
        subfolder: "warsh/warsh_ibrahim_aldosary_128kbps",
        name: "(Warsh) Ibrahim Al-Dosary",
        bitrate: "128kbps"
    },
    {
        subfolder: "warsh/warsh_yassin_al_jazaery_64kbps",
        name: "(Warsh) Yassin Al-Jazaery",
        bitrate: "64kbps"
    },
    {
        subfolder: "warsh/warsh_Abdul_Basit_128kbps",
        name: "(Warsh) Abdul Basit",
        bitrate: "128kbps"
    },
    {
        subfolder: "translations/urdu_shamshad_ali_khan_46kbps",
        name: "(Urdu) Shamshad Ali Khan",
        bitrate: "46kbps"
    },
    {
        subfolder: "Karim_Mansoori_40kbps",
        name: "Karim Mansoori (Iran)",
        bitrate: "40kbps"
    },
    {
        subfolder: "Husary_Muallim_128kbps",
        name: "Husary (Muallim)",
        bitrate: "128kbps"
    },
    {
        subfolder: "Khaalid_Abdullaah_al-Qahtaanee_192kbps",
        name: "Khalid Abdullah al-Qahtanee",
        bitrate: "192kbps"
    },
    {
        subfolder: "Yasser_Ad-Dussary_128kbps",
        name: "Yasser_Ad-Dussary",
        bitrate: "128kbps"
    },
    {
        subfolder: "Nasser_Alqatami_128kbps",
        name: "Nasser_Alqatami",
        bitrate: "128kbps"
    },
    {
        subfolder: "Ali_Hajjaj_AlSuesy_128kbps",
        name: "Ali_Hajjaj_AlSuesy",
        bitrate: "128kbps"
    },
    {
        subfolder: "Sahl_Yassin_128kbps",
        name: "Sahl_Yassin",
        bitrate: "128kbps"
    },
    {
        subfolder: "ahmed_ibn_ali_al_ajamy_128kbps",
        name: "Ahmed Ibn Ali Al Ajamy",
        bitrate: "128kbps"
    },
    {
        subfolder: "translations/besim_korkut_ajet_po_ajet",
        name: "Besim Korkut (Bosnian)",
        bitrate: "128kbps"
    },
    {
        subfolder: "aziz_alili_128kbps",
        name: "Aziz Alili",
        bitrate: "128kbps"
    },
    {
        subfolder: "Yaser_Salamah_128kbps",
        name: "Yaser Salamah",
        bitrate: "128kbps"
    },
    {
        subfolder: "Akram_AlAlaqimy_128kbps",
        name: "Akram Al Alaqimy",
        bitrate: "128kbps"
    },
    {
        subfolder: "Ali_Jaber_64kbps",
        name: "Ali Jaber",
        bitrate: "64kbps"
    },
    {
        subfolder: "Fares_Abbad_64kbps",
        name: "Fares Abbad",
        bitrate: "64kbps"
    },
    {
        subfolder: "translations/urdu_farhat_hashmi",
        name: "Farhat Hashmi (Urdu word for word translation)",
        bitrate: "32kbps"
    },
];
tartilInfo.forEach(function (el) {
    var tartil = new QuranTelavat(el);
    quranData.tartilInfo.push(tartil);
});
//------------------ Juz Data ---------------------
[
    // [sura, aya]
    [1, 1], [2, 142], [2, 253], [3, 93], [4, 24],
    [4, 148], [5, 82], [6, 111], [7, 88], [8, 41],
    [9, 93], [11, 6], [12, 53], [15, 1], [17, 1],
    [18, 75], [21, 1], [23, 1], [25, 21], [27, 56],
    [29, 46], [33, 31], [36, 28], [39, 32], [41, 47],
    [46, 1], [51, 31], [58, 1], [67, 1], [78, 1]
].forEach(function (el, ind) {
    var qr = new QuranReference();
    qr.aya = el[1];
    qr.sura = el[0];
    quranData.juz.push(qr);
});
//------------------ Hizb Data ---------------------
[
    // [sura, aya]
    [1, 1], [2, 26], [2, 44], [2, 60],
    [2, 75], [2, 92], [2, 106], [2, 124],
    [2, 142], [2, 158], [2, 177], [2, 189],
    [2, 203], [2, 219], [2, 233], [2, 243],
    [2, 253], [2, 263], [2, 272], [2, 283],
    [3, 15], [3, 33], [3, 52], [3, 75],
    [3, 93], [3, 113], [3, 133], [3, 153],
    [3, 171], [3, 186], [4, 1], [4, 12],
    [4, 24], [4, 36], [4, 58], [4, 74],
    [4, 88], [4, 100], [4, 114], [4, 135],
    [4, 148], [4, 163], [5, 1], [5, 12],
    [5, 27], [5, 41], [5, 51], [5, 67],
    [5, 82], [5, 97], [5, 109], [6, 13],
    [6, 36], [6, 59], [6, 74], [6, 95],
    [6, 111], [6, 127], [6, 141], [6, 151],
    [7, 1], [7, 31], [7, 47], [7, 65],
    [7, 88], [7, 117], [7, 142], [7, 156],
    [7, 171], [7, 189], [8, 1], [8, 22],
    [8, 41], [8, 61], [9, 1], [9, 19],
    [9, 34], [9, 46], [9, 60], [9, 75],
    [9, 93], [9, 111], [9, 122], [10, 11],
    [10, 26], [10, 53], [10, 71], [10, 90],
    [11, 6], [11, 24], [11, 41], [11, 61],
    [11, 84], [11, 108], [12, 7], [12, 30],
    [12, 53], [12, 77], [12, 101], [13, 5],
    [13, 19], [13, 35], [14, 10], [14, 28],
    [15, 1], [15, 50], [16, 1], [16, 30],
    [16, 51], [16, 75], [16, 90], [16, 111],
    [17, 1], [17, 23], [17, 50], [17, 70],
    [17, 99], [18, 17], [18, 32], [18, 51],
    [18, 75], [18, 99], [19, 22], [19, 59],
    [20, 1], [20, 55], [20, 83], [20, 111],
    [21, 1], [21, 29], [21, 51], [21, 83],
    [22, 1], [22, 19], [22, 38], [22, 60],
    [23, 1], [23, 36], [23, 75], [24, 1],
    [24, 21], [24, 35], [24, 53], [25, 1],
    [25, 21], [25, 53], [26, 1], [26, 52],
    [26, 111], [26, 181], [27, 1], [27, 27],
    [27, 56], [27, 82], [28, 12], [28, 29],
    [28, 51], [28, 76], [29, 1], [29, 26],
    [29, 46], [30, 1], [30, 31], [30, 54],
    [31, 22], [32, 11], [33, 1], [33, 18],
    [33, 31], [33, 51], [33, 60], [34, 10],
    [34, 24], [34, 46], [35, 15], [35, 41],
    [36, 28], [36, 60], [37, 22], [37, 83],
    [37, 145], [38, 21], [38, 52], [39, 8],
    [39, 32], [39, 53], [40, 1], [40, 21],
    [40, 41], [40, 66], [41, 9], [41, 25],
    [41, 47], [42, 13], [42, 27], [42, 51],
    [43, 24], [43, 57], [44, 17], [45, 12],
    [46, 1], [46, 21], [47, 10], [47, 33],
    [48, 18], [49, 1], [49, 14], [50, 27],
    [51, 31], [52, 24], [53, 26], [54, 9],
    [55, 1], [56, 1], [56, 75], [57, 16],
    [58, 1], [58, 14], [59, 11], [60, 7],
    [62, 1], [63, 4], [65, 1], [66, 1],
    [67, 1], [68, 1], [69, 1], [70, 19],
    [72, 1], [73, 20], [75, 1], [76, 19],
    [78, 1], [80, 1], [82, 1], [84, 1],
    [87, 1], [90, 1], [94, 1], [100, 9]
].forEach(function (el, ind) {
    var qr = new QuranReference();
    qr.aya = el[1];
    qr.sura = el[0];
    quranData.qhizb.push(qr);
    if (!(ind % 4)) {
        var h = new QuranReference();
        h.aya = el[1];
        h.sura = el[0];
        quranData.hizb.push(h);
    }
});
//------------------ Manzil Data ---------------------
[
    // [sura, aya]
    [1, 1], [5, 1], [10, 1], [17, 1],
    [26, 1], [37, 1], [50, 1]
].forEach(function (el) {
    var qr = new QuranReference();
    qr.aya = el[1];
    qr.sura = el[0];
    quranData.manzil.push(qr);
});
//------------------ Ruku Data ---------------------
[
    // [sura, aya]
    [1, 1], [2, 1], [2, 8], [2, 21], [2, 30],
    [2, 40], [2, 47], [2, 60], [2, 62], [2, 72],
    [2, 83], [2, 87], [2, 97], [2, 104], [2, 113],
    [2, 122], [2, 130], [2, 142], [2, 148], [2, 153],
    [2, 164], [2, 168], [2, 177], [2, 183], [2, 189],
    [2, 197], [2, 211], [2, 217], [2, 222], [2, 229],
    [2, 232], [2, 236], [2, 243], [2, 249], [2, 254],
    [2, 258], [2, 261], [2, 267], [2, 274], [2, 282],
    [2, 284], [3, 1], [3, 10], [3, 21], [3, 31],
    [3, 42], [3, 55], [3, 64], [3, 72], [3, 81],
    [3, 92], [3, 102], [3, 110], [3, 121], [3, 130],
    [3, 144], [3, 149], [3, 156], [3, 172], [3, 181],
    [3, 190], [4, 1], [4, 11], [4, 15], [4, 23],
    [4, 26], [4, 34], [4, 43], [4, 51], [4, 60],
    [4, 71], [4, 77], [4, 88], [4, 92], [4, 97],
    [4, 101], [4, 105], [4, 113], [4, 116], [4, 127],
    [4, 135], [4, 142], [4, 153], [4, 163], [4, 172],
    [5, 1], [5, 6], [5, 12], [5, 20], [5, 27],
    [5, 35], [5, 44], [5, 51], [5, 57], [5, 67],
    [5, 78], [5, 87], [5, 94], [5, 101], [5, 109],
    [5, 116], [6, 1], [6, 11], [6, 21], [6, 31],
    [6, 42], [6, 51], [6, 56], [6, 61], [6, 71],
    [6, 83], [6, 91], [6, 95], [6, 101], [6, 111],
    [6, 122], [6, 130], [6, 141], [6, 145], [6, 151],
    [6, 155], [7, 1], [7, 11], [7, 26], [7, 32],
    [7, 40], [7, 48], [7, 54], [7, 59], [7, 65],
    [7, 73], [7, 85], [7, 94], [7, 100], [7, 109],
    [7, 127], [7, 130], [7, 142], [7, 148], [7, 152],
    [7, 158], [7, 163], [7, 172], [7, 182], [7, 189],
    [8, 1], [8, 11], [8, 20], [8, 29], [8, 38],
    [8, 45], [8, 49], [8, 59], [8, 65], [8, 70],
    [9, 1], [9, 7], [9, 17], [9, 25], [9, 30],
    [9, 38], [9, 43], [9, 60], [9, 67], [9, 73],
    [9, 81], [9, 90], [9, 100], [9, 111], [9, 119],
    [9, 123], [10, 1], [10, 11], [10, 21], [10, 31],
    [10, 41], [10, 54], [10, 61], [10, 71], [10, 83],
    [10, 93], [10, 104], [11, 1], [11, 9], [11, 25],
    [11, 36], [11, 50], [11, 61], [11, 69], [11, 84],
    [11, 96], [11, 110], [12, 1], [12, 7], [12, 21],
    [12, 30], [12, 36], [12, 43], [12, 50], [12, 58],
    [12, 69], [12, 80], [12, 94], [12, 105], [13, 1],
    [13, 8], [13, 19], [13, 27], [13, 32], [13, 38],
    [14, 1], [14, 7], [14, 13], [14, 22], [14, 28],
    [14, 35], [14, 42], [15, 1], [15, 16], [15, 26],
    [15, 45], [15, 61], [15, 80], [16, 1], [16, 10],
    [16, 22], [16, 26], [16, 35], [16, 41], [16, 51],
    [16, 61], [16, 66], [16, 71], [16, 77], [16, 84],
    [16, 90], [16, 101], [16, 111], [16, 120], [17, 1],
    [17, 11], [17, 23], [17, 31], [17, 41], [17, 53],
    [17, 61], [17, 71], [17, 78], [17, 85], [17, 94],
    [17, 101], [18, 1], [18, 13], [18, 18], [18, 23],
    [18, 32], [18, 45], [18, 50], [18, 54], [18, 60],
    [18, 71], [18, 83], [18, 102], [19, 1], [19, 16],
    [19, 41], [19, 51], [19, 66], [19, 83], [20, 1],
    [20, 25], [20, 55], [20, 77], [20, 90], [20, 105],
    [20, 116], [20, 129], [21, 1], [21, 11], [21, 30],
    [21, 42], [21, 51], [21, 76], [21, 94], [22, 1],
    [22, 11], [22, 23], [22, 26], [22, 34], [22, 39],
    [22, 49], [22, 58], [22, 65], [22, 73], [23, 1],
    [23, 23], [23, 33], [23, 51], [23, 78], [23, 93],
    [24, 1], [24, 11], [24, 21], [24, 27], [24, 35],
    [24, 41], [24, 51], [24, 58], [24, 62], [25, 1],
    [25, 10], [25, 21], [25, 35], [25, 45], [25, 61],
    [26, 1], [26, 10], [26, 34], [26, 53], [26, 70],
    [26, 105], [26, 123], [26, 141], [26, 160], [26, 176],
    [26, 192], [27, 1], [27, 15], [27, 32], [27, 45],
    [27, 59], [27, 67], [27, 83], [28, 1], [28, 14],
    [28, 22], [28, 29], [28, 43], [28, 51], [28, 61],
    [28, 76], [29, 1], [29, 14], [29, 23], [29, 31],
    [29, 45], [29, 52], [29, 64], [30, 1], [30, 11],
    [30, 20], [30, 28], [30, 41], [30, 54], [31, 1],
    [31, 12], [31, 20], [32, 1], [32, 12], [32, 23],
    [33, 1], [33, 9], [33, 21], [33, 28], [33, 35],
    [33, 41], [33, 53], [33, 59], [33, 69], [34, 1],
    [34, 10], [34, 22], [34, 31], [34, 37], [34, 46],
    [35, 1], [35, 8], [35, 15], [35, 27], [35, 38],
    [36, 1], [36, 13], [36, 33], [36, 51], [36, 68],
    [37, 1], [37, 22], [37, 75], [37, 114], [37, 139],
    [38, 1], [38, 15], [38, 27], [38, 41], [38, 65],
    [39, 1], [39, 10], [39, 22], [39, 32], [39, 42],
    [39, 53], [39, 64], [39, 71], [40, 1], [40, 10],
    [40, 21], [40, 28], [40, 38], [40, 51], [40, 61],
    [40, 69], [40, 79], [41, 1], [41, 9], [41, 19],
    [41, 26], [41, 33], [41, 45], [42, 1], [42, 10],
    [42, 20], [42, 30], [42, 44], [43, 1], [43, 16],
    [43, 26], [43, 36], [43, 46], [43, 57], [43, 68],
    [44, 1], [44, 30], [44, 43], [45, 1], [45, 12],
    [45, 22], [45, 27], [46, 1], [46, 11], [46, 21],
    [46, 27], [47, 1], [47, 12], [47, 20], [47, 29],
    [48, 1], [48, 11], [48, 18], [48, 27], [49, 1],
    [49, 11], [50, 1], [50, 16], [50, 30], [51, 1],
    [51, 24], [51, 47], [52, 1], [52, 29], [53, 1],
    [53, 26], [53, 33], [54, 1], [54, 23], [54, 41],
    [55, 1], [55, 26], [55, 46], [56, 1], [56, 39],
    [56, 75], [57, 1], [57, 11], [57, 20], [57, 26],
    [58, 1], [58, 7], [58, 14], [59, 1], [59, 11],
    [59, 18], [60, 1], [60, 7], [61, 1], [61, 10],
    [62, 1], [62, 9], [63, 1], [63, 9], [64, 1],
    [64, 11], [65, 1], [65, 8], [66, 1], [66, 8],
    [67, 1], [67, 15], [68, 1], [68, 34], [69, 1],
    [69, 38], [70, 1], [70, 36], [71, 1], [71, 21],
    [72, 1], [72, 20], [73, 1], [73, 20], [74, 1],
    [74, 32], [75, 1], [75, 31], [76, 1], [76, 23],
    [77, 1], [77, 41], [78, 1], [78, 31], [79, 1],
    [79, 27], [80, 1], [81, 1], [82, 1], [83, 1],
    [84, 1], [85, 1], [86, 1], [87, 1], [88, 1],
    [89, 1], [90, 1], [91, 1], [92, 1], [93, 1],
    [94, 1], [95, 1], [96, 1], [97, 1], [98, 1],
    [99, 1], [100, 1], [101, 1], [102, 1], [103, 1],
    [104, 1], [105, 1], [106, 1], [107, 1], [108, 1],
    [109, 1], [110, 1], [111, 1], [112, 1], [113, 1],
    [114, 1]
].forEach(function (el) {
    var qr = new QuranReference();
    qr.aya = el[1];
    qr.sura = el[0];
    quranData.ruku.push(qr);
});
//------------------ Page Data ---------------------
[
    // [sura, aya]
    [1, 1], [2, 1], [2, 6], [2, 17], [2, 25],
    [2, 30], [2, 38], [2, 49], [2, 58], [2, 62],
    [2, 70], [2, 77], [2, 84], [2, 89], [2, 94],
    [2, 102], [2, 106], [2, 113], [2, 120], [2, 127],
    [2, 135], [2, 142], [2, 146], [2, 154], [2, 164],
    [2, 170], [2, 177], [2, 182], [2, 187], [2, 191],
    [2, 197], [2, 203], [2, 211], [2, 216], [2, 220],
    [2, 225], [2, 231], [2, 234], [2, 238], [2, 246],
    [2, 249], [2, 253], [2, 257], [2, 260], [2, 265],
    [2, 270], [2, 275], [2, 282], [2, 283], [3, 1],
    [3, 10], [3, 16], [3, 23], [3, 30], [3, 38],
    [3, 46], [3, 53], [3, 62], [3, 71], [3, 78],
    [3, 84], [3, 92], [3, 101], [3, 109], [3, 116],
    [3, 122], [3, 133], [3, 141], [3, 149], [3, 154],
    [3, 158], [3, 166], [3, 174], [3, 181], [3, 187],
    [3, 195], [4, 1], [4, 7], [4, 12], [4, 15],
    [4, 20], [4, 24], [4, 27], [4, 34], [4, 38],
    [4, 45], [4, 52], [4, 60], [4, 66], [4, 75],
    [4, 80], [4, 87], [4, 92], [4, 95], [4, 102],
    [4, 106], [4, 114], [4, 122], [4, 128], [4, 135],
    [4, 141], [4, 148], [4, 155], [4, 163], [4, 171],
    [4, 176], [5, 3], [5, 6], [5, 10], [5, 14],
    [5, 18], [5, 24], [5, 32], [5, 37], [5, 42],
    [5, 46], [5, 51], [5, 58], [5, 65], [5, 71],
    [5, 77], [5, 83], [5, 90], [5, 96], [5, 104],
    [5, 109], [5, 114], [6, 1], [6, 9], [6, 19],
    [6, 28], [6, 36], [6, 45], [6, 53], [6, 60],
    [6, 69], [6, 74], [6, 82], [6, 91], [6, 95],
    [6, 102], [6, 111], [6, 119], [6, 125], [6, 132],
    [6, 138], [6, 143], [6, 147], [6, 152], [6, 158],
    [7, 1], [7, 12], [7, 23], [7, 31], [7, 38],
    [7, 44], [7, 52], [7, 58], [7, 68], [7, 74],
    [7, 82], [7, 88], [7, 96], [7, 105], [7, 121],
    [7, 131], [7, 138], [7, 144], [7, 150], [7, 156],
    [7, 160], [7, 164], [7, 171], [7, 179], [7, 188],
    [7, 196], [8, 1], [8, 9], [8, 17], [8, 26],
    [8, 34], [8, 41], [8, 46], [8, 53], [8, 62],
    [8, 70], [9, 1], [9, 7], [9, 14], [9, 21],
    [9, 27], [9, 32], [9, 37], [9, 41], [9, 48],
    [9, 55], [9, 62], [9, 69], [9, 73], [9, 80],
    [9, 87], [9, 94], [9, 100], [9, 107], [9, 112],
    [9, 118], [9, 123], [10, 1], [10, 7], [10, 15],
    [10, 21], [10, 26], [10, 34], [10, 43], [10, 54],
    [10, 62], [10, 71], [10, 79], [10, 89], [10, 98],
    [10, 107], [11, 6], [11, 13], [11, 20], [11, 29],
    [11, 38], [11, 46], [11, 54], [11, 63], [11, 72],
    [11, 82], [11, 89], [11, 98], [11, 109], [11, 118],
    [12, 5], [12, 15], [12, 23], [12, 31], [12, 38],
    [12, 44], [12, 53], [12, 64], [12, 70], [12, 79],
    [12, 87], [12, 96], [12, 104], [13, 1], [13, 6],
    [13, 14], [13, 19], [13, 29], [13, 35], [13, 43],
    [14, 6], [14, 11], [14, 19], [14, 25], [14, 34],
    [14, 43], [15, 1], [15, 16], [15, 32], [15, 52],
    [15, 71], [15, 91], [16, 7], [16, 15], [16, 27],
    [16, 35], [16, 43], [16, 55], [16, 65], [16, 73],
    [16, 80], [16, 88], [16, 94], [16, 103], [16, 111],
    [16, 119], [17, 1], [17, 8], [17, 18], [17, 28],
    [17, 39], [17, 50], [17, 59], [17, 67], [17, 76],
    [17, 87], [17, 97], [17, 105], [18, 5], [18, 16],
    [18, 21], [18, 28], [18, 35], [18, 46], [18, 54],
    [18, 62], [18, 75], [18, 84], [18, 98], [19, 1],
    [19, 12], [19, 26], [19, 39], [19, 52], [19, 65],
    [19, 77], [19, 96], [20, 13], [20, 38], [20, 52],
    [20, 65], [20, 77], [20, 88], [20, 99], [20, 114],
    [20, 126], [21, 1], [21, 11], [21, 25], [21, 36],
    [21, 45], [21, 58], [21, 73], [21, 82], [21, 91],
    [21, 102], [22, 1], [22, 6], [22, 16], [22, 24],
    [22, 31], [22, 39], [22, 47], [22, 56], [22, 65],
    [22, 73], [23, 1], [23, 18], [23, 28], [23, 43],
    [23, 60], [23, 75], [23, 90], [23, 105], [24, 1],
    [24, 11], [24, 21], [24, 28], [24, 32], [24, 37],
    [24, 44], [24, 54], [24, 59], [24, 62], [25, 3],
    [25, 12], [25, 21], [25, 33], [25, 44], [25, 56],
    [25, 68], [26, 1], [26, 20], [26, 40], [26, 61],
    [26, 84], [26, 112], [26, 137], [26, 160], [26, 184],
    [26, 207], [27, 1], [27, 14], [27, 23], [27, 36],
    [27, 45], [27, 56], [27, 64], [27, 77], [27, 89],
    [28, 6], [28, 14], [28, 22], [28, 29], [28, 36],
    [28, 44], [28, 51], [28, 60], [28, 71], [28, 78],
    [28, 85], [29, 7], [29, 15], [29, 24], [29, 31],
    [29, 39], [29, 46], [29, 53], [29, 64], [30, 6],
    [30, 16], [30, 25], [30, 33], [30, 42], [30, 51],
    [31, 1], [31, 12], [31, 20], [31, 29], [32, 1],
    [32, 12], [32, 21], [33, 1], [33, 7], [33, 16],
    [33, 23], [33, 31], [33, 36], [33, 44], [33, 51],
    [33, 55], [33, 63], [34, 1], [34, 8], [34, 15],
    [34, 23], [34, 32], [34, 40], [34, 49], [35, 4],
    [35, 12], [35, 19], [35, 31], [35, 39], [35, 45],
    [36, 13], [36, 28], [36, 41], [36, 55], [36, 71],
    [37, 1], [37, 25], [37, 52], [37, 77], [37, 103],
    [37, 127], [37, 154], [38, 1], [38, 17], [38, 27],
    [38, 43], [38, 62], [38, 84], [39, 6], [39, 11],
    [39, 22], [39, 32], [39, 41], [39, 48], [39, 57],
    [39, 68], [39, 75], [40, 8], [40, 17], [40, 26],
    [40, 34], [40, 41], [40, 50], [40, 59], [40, 67],
    [40, 78], [41, 1], [41, 12], [41, 21], [41, 30],
    [41, 39], [41, 47], [42, 1], [42, 11], [42, 16],
    [42, 23], [42, 32], [42, 45], [42, 52], [43, 11],
    [43, 23], [43, 34], [43, 48], [43, 61], [43, 74],
    [44, 1], [44, 19], [44, 40], [45, 1], [45, 14],
    [45, 23], [45, 33], [46, 6], [46, 15], [46, 21],
    [46, 29], [47, 1], [47, 12], [47, 20], [47, 30],
    [48, 1], [48, 10], [48, 16], [48, 24], [48, 29],
    [49, 5], [49, 12], [50, 1], [50, 16], [50, 36],
    [51, 7], [51, 31], [51, 52], [52, 15], [52, 32],
    [53, 1], [53, 27], [53, 45], [54, 7], [54, 28],
    [54, 50], [55, 17], [55, 41], [55, 68], [56, 17],
    [56, 51], [56, 77], [57, 4], [57, 12], [57, 19],
    [57, 25], [58, 1], [58, 7], [58, 12], [58, 22],
    [59, 4], [59, 10], [59, 17], [60, 1], [60, 6],
    [60, 12], [61, 6], [62, 1], [62, 9], [63, 5],
    [64, 1], [64, 10], [65, 1], [65, 6], [66, 1],
    [66, 8], [67, 1], [67, 13], [67, 27], [68, 16],
    [68, 43], [69, 9], [69, 35], [70, 11], [70, 40],
    [71, 11], [72, 1], [72, 14], [73, 1], [73, 20],
    [74, 18], [74, 48], [75, 20], [76, 6], [76, 26],
    [77, 20], [78, 1], [78, 31], [79, 16], [80, 1],
    [81, 1], [82, 1], [83, 7], [83, 35], [85, 1],
    [86, 1], [87, 16], [89, 1], [89, 24], [91, 1],
    [92, 15], [95, 1], [97, 1], [98, 8], [100, 10],
    [103, 1], [106, 1], [109, 1], [112, 1], [114, 1]
].forEach(function (el) {
    var qr = new QuranReference();
    qr.aya = el[1];
    qr.sura = el[0];
    quranData.page.push(qr);
});
[
    [1, 1], [2, 1], [2, 6], [2, 10], [2, 17], [2, 20], [2, 25], [2, 26], [2, 30], [2, 33], [2, 38], [2, 41], [2, 49], [2, 53], [2, 58], [2, 60], [2, 62], [2, 64], [2, 70], [2, 73], [2, 77], [2, 80], [2, 84], [2, 85], [2, 89], [2, 90], [2, 94], [2, 96], [2, 102], [2, 102, 209], [2, 106], [2, 109, 130], [2, 113], [2, 114], [2, 120], [2, 123], [2, 127], [2, 130], [2, 135], [2, 137], [2, 142], [2, 143], [2, 146], [2, 149], [2, 154], [2, 158], [2, 164], [2, 165], [2, 170], [2, 173], [2, 177], [2, 178, 116], [2, 182], [2, 184], [2, 187], [2, 187, 117], [2, 191], [2, 194], [2, 197], [2, 198], [2, 203], [2, 205], [2, 211], [2, 213, 207], [2, 216], [2, 217, 254], [2, 220], [2, 221], [2, 225], [2, 228], [2, 231], [2, 232], [2, 234], [2, 235], [2, 238], [2, 240], [2, 246], [2, 247, 245], [2, 249], [2, 249, 85], [2, 253], [2, 254], [2, 257], [2, 258], [2, 260], [2, 261], [2, 265], [2, 266], [2, 270], [2, 272], [2, 275], [2, 276], [2, 282], [2, 282, 1138], [2, 283], [2, 284], [3, 0], [3, 6], [3, 10], [3, 13], [3, 16], [3, 19], [3, 23], [3, 26], [3, 30], [3, 33], [3, 38], [3, 41], [3, 46], [3, 49, 174], [3, 53], [3, 56], [3, 62], [3, 65], [3, 71], [3, 73], [3, 78], [3, 79], [3, 84], [3, 86], [3, 92], [3, 95], [3, 101], [3, 103], [3, 109], [3, 112, 81], [3, 116], [3, 118], [3, 122], [3, 125], [3, 133], [3, 135], [3, 141], [3, 144], [3, 149], [3, 152, 216], [3, 154], [3, 154, 117], [3, 158], [3, 161], [3, 166], [3, 168], [3, 174], [3, 177], [3, 181], [3, 183], [3, 187], [3, 190], [3, 195], [3, 196], [4, 0], [4, 3], [4, 7], [4, 10], [4, 12], [4, 12, 113], [4, 15], [4, 17], [4, 20], [4, 22], [4, 24], [4, 25, 129], [4, 27], [4, 30], [4, 34], [4, 35], [4, 38], [4, 41], [4, 45], [4, 47], [4, 52], [4, 56], [4, 60], [4, 62], [4, 66], [4, 69], [4, 75], [4, 77, 152], [4, 80], [4, 83], [4, 87], [4, 89], [4, 92], [4, 92, 345], [4, 95], [4, 97], [4, 102], [4, 102, 135], [4, 106], [4, 109], [4, 114], [4, 116], [4, 122], [4, 124], [4, 128], [4, 129], [4, 135], [4, 136], [4, 141], [4, 142], [4, 148], [4, 151], [4, 155], [4, 157], [4, 163], [4, 165], [4, 171], [4, 172], [4, 176], [5, 1], [5, 3], [5, 4, 410], [5, 6], [5, 6, 93], [5, 10], [5, 12, 298], [5, 14], [5, 15], [5, 18], [5, 19], [5, 24], [5, 27], [5, 32], [5, 33], [5, 37], [5, 40], [5, 42], [5, 44, 289], [5, 46], [5, 48, 95], [5, 51], [5, 53], [5, 58], [5, 61], [5, 65], [5, 67], [5, 71], [5, 72], [5, 77], [5, 79], [5, 83], [5, 86], [5, 90], [5, 93], [5, 96], [5, 98], [5, 104], [5, 106, 194], [5, 109], [5, 110, 134], [5, 114], [5, 116], [6, 0], [6, 4], [6, 9], [6, 12], [6, 19], [6, 21], [6, 28], [6, 31], [6, 36], [6, 39], [6, 45], [6, 48], [6, 53], [6, 56], [6, 60], [6, 63], [6, 69], [6, 70], [6, 74], [6, 77], [6, 82], [6, 85], [6, 91], [6, 92], [6, 95], [6, 98], [6, 102], [6, 106], [6, 111], [6, 113], [6, 119], [6, 121], [6, 125], [6, 128, 82], [6, 132], [6, 135], [6, 138], [6, 139], [6, 143], [6, 144], [6, 147], [6, 149], [6, 152], [6, 153], [6, 158], [6, 160], [7, 0], [7, 5], [7, 12], [7, 18], [7, 23], [7, 27, 157], [7, 31], [7, 33], [7, 38], [7, 40], [7, 44], [7, 47], [7, 52], [7, 54], [7, 58], [7, 61], [7, 68], [7, 70], [7, 74], [7, 75], [7, 82], [7, 85, 168], [7, 88], [7, 89], [7, 96], [7, 100], [7, 105], [7, 110], [7, 121], [7, 126], [7, 131], [7, 133], [7, 138], [7, 141], [7, 144], [7, 146], [7, 150], [7, 152], [7, 156], [7, 157, 68], [7, 160], [7, 161, 240], [7, 164], [7, 167], [7, 171], [7, 173], [7, 179], [7, 182], [7, 188], [7, 189], [7, 196], [7, 201], [8, 0], [8, 3], [8, 9], [8, 11], [8, 17], [8, 20], [8, 26], [8, 29], [8, 34], [8, 36], [8, 41], [8, 42], [8, 46], [8, 48], [8, 53], [8, 56], [8, 62], [8, 65], [8, 70], [8, 72, 191], [9, 0], [9, 3], [9, 7], [9, 9], [9, 14], [9, 17], [9, 21], [9, 24, 168], [9, 27], [9, 29], [9, 32], [9, 34], [9, 37], [9, 38], [9, 41], [9, 43], [9, 48], [9, 51], [9, 55], [9, 58], [9, 62], [9, 65], [9, 69], [9, 70], [9, 73], [9, 74], [9, 80], [9, 82], [9, 87], [9, 90], [9, 94], [9, 95], [9, 100], [9, 102], [9, 107], [9, 109], [9, 112], [9, 114], [9, 118], [9, 120, 209], [9, 123], [9, 125], [10, 0], [10, 3], [10, 7], [10, 10], [10, 15], [10, 17], [10, 21], [10, 22], [10, 26], [10, 28], [10, 34], [10, 37], [10, 43], [10, 46], [10, 54], [10, 57], [10, 62], [10, 66], [10, 71], [10, 73], [10, 79], [10, 83], [10, 89], [10, 92], [10, 98], [10, 101], [10, 107], [10, 109], [11, 6], [11, 8], [11, 13], [11, 16], [11, 20], [11, 23], [11, 29], [11, 31], [11, 38], [11, 41], [11, 46], [11, 48], [11, 54], [11, 58], [11, 63], [11, 66], [11, 72], [11, 77], [11, 82], [11, 85], [11, 89], [11, 92], [11, 98], [11, 102], [11, 109], [11, 112], [11, 118], [11, 121], [12, 5], [12, 8], [12, 15], [12, 18], [12, 23], [12, 25], [12, 31], [12, 33], [12, 38], [12, 40], [12, 44], [12, 47], [12, 53], [12, 57], [12, 64], [12, 66], [12, 70], [12, 75], [12, 79], [12, 81], [12, 87], [12, 89], [12, 96], [12, 100, 54], [12, 104], [12, 108], [13, 0], [13, 3], [13, 6], [13, 9], [13, 14], [13, 16], [13, 19], [13, 23], [13, 29], [13, 31], [13, 35], [13, 37], [13, 43], [14, 2], [14, 6], [14, 8], [14, 11], [14, 13], [14, 19], [14, 22, 127], [14, 25], [14, 28], [14, 34], [14, 37], [14, 43], [14, 45], [15, 0], [15, 6], [15, 16], [15, 22], [15, 32], [15, 39], [15, 52], [15, 59], [15, 71], [15, 80], [15, 91], [15, 99], [16, 7], [16, 10], [16, 15], [16, 21], [16, 27], [16, 30], [16, 35], [16, 36], [16, 43], [16, 47], [16, 55], [16, 60], [16, 65], [16, 68], [16, 73], [16, 76], [16, 80], [16, 81], [16, 88], [16, 90], [16, 94], [16, 97], [16, 103], [16, 106], [16, 111], [16, 114], [16, 119], [16, 123], [17, 0], [17, 4], [17, 8], [17, 12], [17, 18], [17, 22], [17, 28], [17, 32], [17, 39], [17, 44], [17, 50], [17, 53], [17, 59], [17, 61], [17, 67], [17, 70], [17, 76], [17, 80], [17, 87], [17, 91], [17, 97], [17, 99], [17, 105], [17, 110], [18, 5], [18, 10], [18, 16], [18, 18], [18, 21], [18, 22], [18, 28], [18, 29], [18, 35], [18, 39], [18, 46], [18, 49], [18, 54], [18, 57, 100], [18, 62], [18, 66], [18, 75], [18, 79], [18, 84], [18, 89], [18, 98], [18, 103], [19, 0], [19, 6], [19, 12], [19, 18], [19, 26], [19, 30], [19, 39], [19, 44], [19, 52], [19, 58], [19, 65], [19, 70], [19, 77], [19, 83], [19, 96], [20, 3], [20, 13], [20, 19], [20, 38], [20, 40], [20, 52], [20, 57], [20, 65], [20, 71], [20, 77], [20, 81], [20, 88], [20, 92], [20, 99], [20, 105], [20, 114], [20, 118], [20, 126], [20, 130], [21, 0], [21, 4], [21, 11], [21, 17], [21, 25], [21, 29], [21, 36], [21, 39], [21, 45], [21, 48], [21, 58], [21, 64], [21, 73], [21, 76], [21, 82], [21, 85], [21, 91], [21, 95], [21, 102], [21, 105], [22, 0], [22, 4], [22, 6], [22, 10], [22, 16], [22, 18], [22, 24], [22, 26], [22, 31], [22, 34], [22, 39], [22, 41], [22, 47], [22, 52], [22, 56], [22, 59], [22, 65], [22, 68], [22, 73], [22, 75], [23, 0], [23, 8], [23, 18], [23, 23], [23, 28], [23, 33], [23, 43], [23, 48], [23, 60], [23, 65], [23, 75], [23, 80], [23, 90], [23, 95], [23, 105], [23, 110], [24, 0], [24, 3], [24, 11], [24, 14], [24, 21], [24, 22], [24, 28], [24, 31, 737], [24, 32], [24, 33], [24, 37], [24, 40], [24, 44], [24, 47], [24, 54], [24, 55], [24, 59], [24, 61, 652], [24, 62], [24, 63], [25, 3], [25, 6], [25, 12], [25, 17], [25, 21], [25, 25], [25, 33], [25, 37], [25, 44], [25, 48], [25, 56], [25, 60], [25, 68], [25, 71], [26, 0], [26, 7], [26, 20], [26, 27], [26, 40], [26, 47], [26, 61], [26, 68], [26, 84], [26, 95], [26, 112], [26, 121], [26, 137], [26, 146], [26, 160], [26, 169], [26, 184], [26, 191], [26, 207], [26, 216], [27, 0], [27, 7], [27, 14], [27, 17], [27, 23], [27, 27], [27, 36], [27, 40], [27, 45], [27, 48], [27, 56], [27, 60], [27, 64], [27, 68], [27, 77], [27, 82], [27, 89], [27, 92], [28, 6], [28, 9], [28, 14], [28, 16], [28, 22], [28, 25], [28, 29], [28, 31], [28, 36], [28, 38], [28, 44], [28, 47], [28, 51], [28, 55], [28, 60], [28, 63], [28, 71], [28, 73], [28, 78], [28, 80], [28, 85], [28, 88], [29, 7], [29, 10], [29, 15], [29, 18], [29, 24], [29, 26], [29, 31], [29, 33], [29, 39], [29, 41], [29, 46], [29, 48], [29, 53], [29, 58], [29, 64], [29, 67], [30, 6], [30, 9], [30, 16], [30, 20], [30, 25], [30, 28], [30, 33], [30, 37], [30, 42], [30, 46], [30, 51], [30, 54], [31, 0], [31, 6], [31, 12], [31, 15], [31, 20], [31, 22], [31, 29], [31, 31], [32, 0], [32, 5], [32, 12], [32, 15], [32, 21], [32, 24], [33, 0], [33, 4], [33, 7], [33, 10], [33, 16], [33, 19], [33, 23], [33, 26], [33, 31], [33, 33], [33, 36], [33, 37], [33, 44], [33, 49], [33, 51], [33, 52], [33, 55], [33, 57], [33, 63], [33, 68], [34, 0], [34, 3], [34, 8], [34, 11], [34, 15], [34, 18], [34, 23], [34, 26], [34, 32], [34, 34], [34, 40], [34, 43], [34, 49], [34, 54], [35, 4], [35, 8], [35, 12], [35, 13], [35, 19], [35, 25], [35, 31], [35, 33], [35, 39], [35, 41], [35, 45], [36, 6], [36, 13], [36, 18], [36, 28], [36, 33], [36, 41], [36, 47], [36, 55], [36, 62], [36, 71], [36, 76], [37, 0], [37, 10], [37, 25], [37, 35], [37, 52], [37, 62], [37, 77], [37, 89], [37, 103], [37, 113], [37, 127], [37, 139], [37, 154], [37, 165], [38, 0], [38, 7], [38, 17], [38, 22], [38, 27], [38, 31], [38, 43], [38, 48], [38, 62], [38, 70], [38, 84], [39, 2], [39, 6], [39, 7], [39, 11], [39, 16], [39, 22], [39, 24], [39, 32], [39, 36], [39, 41], [39, 43], [39, 48], [39, 51], [39, 57], [39, 61], [39, 68], [39, 71, 152], [39, 75], [40, 4], [40, 8], [40, 11], [40, 17], [40, 21, 168], [40, 26], [40, 28], [40, 34], [40, 36], [40, 41], [40, 44], [40, 50], [40, 53], [40, 59], [40, 62], [40, 67], [40, 70], [40, 78], [40, 80], [41, 0], [41, 6], [41, 12], [41, 15], [41, 21], [41, 24], [41, 30], [41, 33], [41, 39], [41, 42], [41, 47], [41, 50], [42, 0], [42, 6], [42, 11], [42, 13], [42, 16], [42, 18], [42, 23], [42, 25], [42, 32], [42, 37], [42, 45], [42, 47], [42, 52], [43, 2], [43, 11], [43, 15], [43, 23], [43, 27], [43, 34], [43, 39], [43, 48], [43, 52], [43, 61], [43, 65], [43, 74], [43, 81], [44, 0], [44, 8], [44, 19], [44, 28], [44, 40], [44, 48], [45, 0], [45, 6], [45, 14], [45, 17], [45, 23], [45, 26], [45, 33], [45, 37], [46, 6], [46, 9], [46, 15], [46, 16], [46, 21], [46, 24], [46, 29], [46, 32], [47, 0], [47, 4], [47, 12], [47, 15], [47, 20], [47, 23], [47, 30], [47, 33], [48, 0], [48, 5], [48, 10], [48, 11], [48, 16], [48, 18], [48, 24], [48, 25], [48, 29], [49, 1, 83], [49, 5], [49, 7], [49, 12], [49, 14], [50, 0], [50, 6], [50, 16], [50, 22], [50, 36], [50, 39], [51, 7], [51, 18], [51, 31], [51, 40], [51, 52], [51, 58], [52, 15], [52, 21], [52, 32], [52, 39], [53, 0], [53, 14], [53, 27], [53, 31], [53, 45], [53, 55], [54, 7], [54, 14], [54, 28], [54, 36], [54, 50], [55, 3], [55, 17], [55, 28], [55, 41], [55, 51], [55, 68], [55, 77], [56, 17], [56, 30], [56, 51], [56, 61], [56, 77], [56, 87], [57, 4], [57, 7], [57, 12], [57, 14], [57, 19], [57, 20], [57, 25], [57, 27, 179], [58, 0], [58, 3], [58, 7], [58, 8], [58, 12], [58, 14], [58, 22], [59, 1, 121], [59, 4], [59, 7, 274], [59, 10], [59, 11], [59, 17], [59, 20], [60, 0], [60, 2], [60, 6], [60, 9], [60, 12], [60, 13], [61, 6], [61, 9], [62, 0], [62, 4], [62, 9], [62, 11], [63, 5], [63, 7], [64, 0], [64, 5], [64, 10], [64, 13], [65, 0], [65, 2], [65, 6], [65, 8], [66, 0], [66, 3], [66, 8], [66, 9], [67, 0], [67, 5], [67, 13], [67, 19], [67, 27], [67, 30], [68, 16], [68, 28], [68, 43], [68, 49], [69, 9], [69, 17], [69, 35], [69, 46], [70, 11], [70, 24], [70, 40], [71, 1], [71, 11], [71, 20], [72, 0], [72, 6], [72, 14], [72, 20], [73, 0], [73, 9], [73, 20], [73, 20, 22], [74, 18], [74, 31, 27], [74, 48], [75, 1], [75, 20], [75, 35], [76, 6], [76, 13], [76, 26], [76, 31], [77, 20], [77, 32], [78, 0], [78, 13], [78, 31], [78, 39], [79, 16], [79, 29], [80, 0], [80, 18], [81, 0], [81, 13], [82, 0], [82, 11], [83, 7], [83, 17], [83, 35], [84, 8], [85, 0], [85, 9], [86, 0], [86, 13], [87, 16], [88, 8], [89, 0], [89, 12], [89, 24], [90, 4], [91, 0], [91, 13], [92, 15], [93, 4], [95, 0], [96, 1], [97, 0], [98, 1], [98, 8], [99, 4], [100, 10], [101, 6], [103, 0], [104, 3], [106, 0], [107, 1], [109, 0], [110, 0]
].forEach(function (el) {
    var qr = new QuranReference();
    qr.aya = el[1];
    qr.sura = el[0];
    qr.substrIndex = el[2] ? el[2] : NaN;
    quranData.halfPage.push(qr);
});
//------------------ Sajda Data ---------------------
[
    // [sura, aya, type
    [7, 206, 'recommended'],
    [13, 15, 'recommended'],
    [16, 50, 'recommended'],
    [17, 109, 'recommended'],
    [19, 58, 'recommended'],
    [22, 18, 'recommended'],
    [22, 77, 'recommended'],
    [25, 60, 'recommended'],
    [27, 26, 'recommended'],
    [38, 24, 'recommended'],
    [84, 21, 'recommended'],
    [32, 15, 'obligatory'],
    [41, 38, 'obligatory'],
    [53, 62, 'obligatory'],
    [96, 19, 'obligatory']
].forEach(function (el) {
    var qr = new QuranReference();
    qr.aya = el[1];
    qr.sura = el[0];
    var sajda = new QuranSajda();
    sajda.loc = qr;
    sajda.vajeb = el[2] === 'obligatory';
    quranData.sajda.push(sajda);
});
var QURAN_DATA = quranData;
//# sourceMappingURL=C:/Users/ali71/WebstormProjects/quran-together/src/quran-data.js.map

/***/ }),

/***/ 129:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__quran_service__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__auth_service__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__msg_service__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_material__ = __webpack_require__(48);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RegistrationComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var RegistrationComponent = (function () {
    function RegistrationComponent(quranService, authService, msgService, dialogRef) {
        this.quranService = quranService;
        this.authService = authService;
        this.msgService = msgService;
        this.dialogRef = dialogRef;
        this.email = '';
        this.reEmail = '';
        this.name = '';
        this.showVerify = false;
        this.conditionalColoring = {
            background: 'normal_back',
            text: 'noraml_text',
            primary: 'normal_primary',
            secondary: 'normal_secondary'
        };
        this.loading = false;
    }
    RegistrationComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.conditionalColoring.background = (this.quranService.nightMode) ? 'night_back' : 'normal_back';
        this.conditionalColoring.text = (this.quranService.nightMode) ? 'night_text' : 'normal_text';
        this.conditionalColoring.primary = (this.quranService.nightMode) ? 'night_primary' : 'normal_primary';
        this.conditionalColoring.secondary = (this.quranService.nightMode) ? 'night_secondary' : 'normal_secondary';
        this.quranService.nightMode$.subscribe(function (data) {
            if (data) {
                _this.conditionalColoring.background = 'night_back';
                _this.conditionalColoring.text = 'night_text';
                _this.conditionalColoring.primary = 'night_primary';
                _this.conditionalColoring.secondary = 'night_secondary';
            }
            else {
                _this.conditionalColoring.background = 'normal_back';
                _this.conditionalColoring.text = 'normal_text';
                _this.conditionalColoring.primary = 'normal_primary';
                _this.conditionalColoring.secondary = 'normal_secondary';
            }
        });
        this.authService.user.subscribe(function (user) {
            if (user !== null && user.email !== null && user.email !== undefined)
                _this.showVerify = true;
            else
                _this.showVerify = false;
        }, function (err) {
            _this.showVerify = false;
        });
        this.authService.loadUser();
    };
    RegistrationComponent.prototype.register = function () {
        var _this = this;
        if (this.mailValidation(this.email)) {
            if (this.email.toLowerCase() === this.reEmail.toLowerCase()) {
                this.setLoading();
                //Register user
                this.authService.register(this.email, this.name)
                    .then(function () {
                    _this.showVerify = true;
                    _this.loading = false;
                })
                    .catch(function (err) {
                    _this.loading = false;
                    _this.msgService.warn(err);
                });
            }
            else
                this.msgService.warn('The repeated email not match');
        }
        else
            this.msgService.warn('The email is not valid');
    };
    RegistrationComponent.prototype.skip = function () {
        this.dialogRef.close();
    };
    RegistrationComponent.prototype.mailValidation = function (mail) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(mail);
    };
    RegistrationComponent.prototype.reSend = function () {
        var _this = this;
        this.setLoading();
        this.authService.register(this.authService.user.getValue().email, this.authService.user.getValue().name)
            .then(function (res) {
            _this.loading = false;
            _this.msgService.message('The verifiction code sent to the ' + _this.authService.user.getValue().email);
        })
            .catch(function (err) {
            _this.loading = false;
            _this.msgService.warn(err);
        });
    };
    RegistrationComponent.prototype.changeMail = function () {
        this.authService.removeUser();
        this.showVerify = false;
    };
    RegistrationComponent.prototype.verify = function (code) {
        var _this = this;
        if (!this.checkCode(code)) {
            this.msgService.warn('The verification code should contain 6 digits');
        }
        else {
            this.authService.verify(code)
                .then(function () {
                _this.showVerify = false;
                _this.dialogRef.close();
            })
                .catch(function (err) {
                _this.msgService.warn(err);
            });
        }
    };
    RegistrationComponent.prototype.checkCode = function (code) {
        if (code.length > 6 || code.length < 6)
            return false;
        for (var i = 0; i < code.length; i++) {
            console.log(code.charCodeAt(i));
            if (code.charCodeAt(i) < 48 || code.charCodeAt(i) > 57)
                return false;
        }
        return true;
    };
    RegistrationComponent.prototype.setLoading = function () {
        this.loading = true;
    };
    return RegistrationComponent;
}());
RegistrationComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_12" /* Component */])({
        selector: 'app-registration',
        template: __webpack_require__(548),
        styles: [__webpack_require__(521)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__quran_service__["a" /* QuranService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__quran_service__["a" /* QuranService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__auth_service__["a" /* AuthService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__auth_service__["a" /* AuthService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__msg_service__["a" /* MsgService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__msg_service__["a" /* MsgService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_4__angular_material__["m" /* MdDialogRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__angular_material__["m" /* MdDialogRef */]) === "function" && _d || Object])
], RegistrationComponent);

var _a, _b, _c, _d;
//# sourceMappingURL=C:/Users/ali71/WebstormProjects/quran-together/src/registration.component.js.map

/***/ }),

/***/ 167:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "KadrNight.bd027dd3b0b6e283d105.svg";

/***/ }),

/***/ 168:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "KadrNormal.aa6a8322404b323022fe.svg";

/***/ }),

/***/ 26:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(112);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_throttleTime__ = __webpack_require__(303);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_throttleTime___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_throttleTime__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__quran_data__ = __webpack_require__(128);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_Subject__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_Subject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_Subject__);
/* unused harmony export SectionAddress */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return QuranService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var FONT_PARAMS = {
    quran: [.8131, 130, false],
    "quran-uthmanic": [46 / 67, 150, true],
    "quran-uthmanic-bold": [37 / 50, 160, true],
    "qalam": [34 / 50, 155, true],
    "me-quran": [30 / 54, 185, true]
};
var SectionAddress = (function () {
    function SectionAddress(obj) {
        this.num = obj.num;
        this.text = obj.text ? obj.text : null;
    }
    return SectionAddress;
}());

var QuranService = (function () {
    function QuranService(http) {
        this.http = http;
        this.contentChangeStream = new __WEBPACK_IMPORTED_MODULE_5_rxjs_Subject__["Subject"]();
        this.zoomChangeStream = new __WEBPACK_IMPORTED_MODULE_5_rxjs_Subject__["Subject"]();
        this.nightModeStream = new __WEBPACK_IMPORTED_MODULE_5_rxjs_Subject__["Subject"]();
        this.ayaStream = new __WEBPACK_IMPORTED_MODULE_5_rxjs_Subject__["Subject"]();
        this.pageStream = new __WEBPACK_IMPORTED_MODULE_5_rxjs_Subject__["Subject"]();
        this.fontChangeStream = new __WEBPACK_IMPORTED_MODULE_5_rxjs_Subject__["Subject"]();
        this.quranData = __WEBPACK_IMPORTED_MODULE_4__quran_data__["a" /* QURAN_DATA */];
        this.contentChanged$ = this.contentChangeStream.asObservable();
        this.zoomChanged$ = this.zoomChangeStream.asObservable();
        this.nightMode$ = this.nightModeStream.asObservable();
        this.aya$ = this.ayaStream.asObservable();
        this.page$ = this.pageStream.asObservable().throttleTime(500);
        this.curZoom = 0;
        this.nightMode = false;
        this.fontChanged$ = this.fontChangeStream.asObservable();
        this.font = 0;
        this.def = 0;
        this.temp = '';
        this.i = 0;
    }
    QuranService.prototype.getQuran = function () {
        return this.http.request('assets/quran-simple-enhanced.json')
            .map(function (res) { return res.json().data; });
    };
    QuranService.prototype.getPage = function (pageNum) {
        var page = this.getSec('page', pageNum);
        return page;
    };
    QuranService.prototype.applySectionFilter = function (sectionType, ayas, index) {
        return this.filterFunc(sectionType, ayas, index);
    };
    QuranService.prototype.getRukus = function (rukuNum) {
        var ruku = this.getSec('ruku', rukuNum);
        return ruku;
    };
    QuranService.prototype.getSura = function (suraNum) {
        return this.quranData.suras[suraNum - 1];
    };
    QuranService.prototype.contentChange = function (layer) {
        this.contentChangeStream.next(layer);
    };
    QuranService.prototype.zoomIn = function () {
        this.curZoom++;
        this.zoomChangeStream.next(this.curZoom);
        return this.curZoom;
    };
    QuranService.prototype.zoomOut = function () {
        this.curZoom--;
        this.zoomChangeStream.next(this.curZoom);
        return this.curZoom;
    };
    QuranService.prototype.resetZoom = function () {
        this.curZoom = 0;
        this.zoomChangeStream.next(0);
        return this.curZoom;
    };
    QuranService.prototype.fontChange = function () {
        this.font++;
        this.fontChangeStream.next(this.font);
    };
    QuranService.prototype.fontParams = function (fontFamily) {
        return FONT_PARAMS[fontFamily];
    };
    QuranService.prototype.sajdaCheck = function (obj) {
        var ind = this.quranData.sajda.findIndex(function (qs) { return qs.loc.aya === obj.aya && qs.loc.sura === obj.sura; });
        return ind;
    };
    QuranService.prototype.nightModeSwitch = function () {
        this.nightMode = !this.nightMode;
        this.nightModeStream.next(this.nightMode);
    };
    QuranService.prototype.qhizbCheck = function (obj) {
        var ind = this.quranData.qhizb.findIndex(function (qs) { return qs.aya === obj.aya && qs.sura === obj.sura; });
        return ind;
    };
    QuranService.prototype.pageForSection = function (sectionType, sectionNumber) {
        var s;
        if (sectionType === 'sura')
            s = new __WEBPACK_IMPORTED_MODULE_4__quran_data__["b" /* QuranReference */]({ sura: sectionNumber, aya: 1 });
        else {
            s = this.getSec(sectionType, sectionNumber);
            if (s.start)
                s = s.start;
            else
                return this.quranData.page.length - 1;
        }
        return this.sectionForAya('page', s).num;
    };
    QuranService.prototype.sectionForAya = function (sectionType, aya) {
        if (sectionType === 'sura')
            return new SectionAddress({ num: aya.sura, text: this.quranData.suras[aya.sura - 1].name });
        else
            return new SectionAddress({ num: this.findReference(sectionType, aya) });
    };
    QuranService.prototype.goForth = function (sectionType, sectionNumber) {
        var p = this.pageForSection(sectionType, sectionNumber);
        if (p < 605)
            this.pageStream.next(p);
        else
            this.pageStream.next(1);
    };
    QuranService.prototype.goBack = function (sectionType, sectionNumber) {
        var p = this.pageForSection(sectionType, sectionNumber);
        if (p > 0)
            this.pageStream.next(p);
        else
            this.pageStream.next(604);
    };
    QuranService.prototype.goTo = function (sectionType, sectionNumber) {
        this.temp = '';
        var p = this.pageForSection(sectionType, sectionNumber);
        if (p > 604)
            this.pageStream.next(1);
        else if (p < 1)
            this.pageStream.next(604);
        else
            this.pageStream.next(p);
    };
    QuranService.prototype.suraNumberCheck = function (str) {
        var ind = this.quranData.suras.findIndex(function (qs) { return qs.name === str; });
        if (ind !== -1)
            return ind + 1;
    };
    QuranService.prototype.pageJuzCheck = function (number) {
        return this.quranData.endJuzPage.findIndex(function (a) { return a >= number; }) + 1;
    };
    QuranService.prototype.suraStats = function (sura) {
        var name, tanzilLocation, ayaCount;
        return this.quranData.suras[sura - 1];
    };
    QuranService.prototype.changeCurAya = function (aya) {
        this.ayaStream.next(aya);
    };
    QuranService.prototype.getSec = function (secType, index) {
        var ret = new __WEBPACK_IMPORTED_MODULE_4__quran_data__["c" /* QuranSection */]();
        if (index <= this.quranData[secType].length) {
            ret.start = this.quranData[secType][index - 1];
        }
        if (index < this.quranData[secType].length) {
            ret.end = this.quranData[secType][index];
        }
        return ret;
    };
    QuranService.prototype.filterFunc = function (secType, ayas, index) {
        var section = this.getSec(secType, index);
        if (section.start && section.end) {
            var startIndex = ayas.findIndex(function (a) { return a.sura === section.start.sura && a.aya === section.start.aya; });
            var endIndex = ayas.findIndex(function (a) { return a.sura === section.end.sura && a.aya === section.end.aya; });
            if (section.start.aya === 1 && section.start.sura !== 1) {
                startIndex--;
            }
            if (section.end.aya === 1) {
                endIndex--;
            }
            var ret = ayas.slice(startIndex, endIndex);
            if (section.start.substrIndex) {
                ret[0] = ret[0].substring(section.start.substrIndex);
            }
            if (section.end.substrIndex) {
                ret[ret.length - 1];
            }
            return ret;
        }
        else
            return ([]);
    };
    QuranService.prototype.findReference = function (secType, ref) {
        var ret = this.quranData[secType].findIndex(function (el) { return el.sura > ref.sura || (el.sura === ref.sura && el.aya > ref.aya); });
        return ret === -1 ? this.quranData[secType].length : ret;
    };
    QuranService.prototype.suraAyaNumberCheck = function (str, flag) {
        var suraBismillah = [81, 83, 84, 85, 87, 88, 89, 90, 92, 94, 96, 98, 100, 102, 105, 108, 111, 113];
        var ind = __WEBPACK_IMPORTED_MODULE_4__quran_data__["a" /* QURAN_DATA */].suras.findIndex(function (qs) { return qs.name === str; }) + 1;
        if (!flag) {
            if (ind < 83) {
                this.temp = '';
                this.i = 0;
                this.def = 0;
                var suraAyaNumber = this.getSura(ind).ayas;
            }
            else {
                var ind1 = suraBismillah.findIndex(function (x) { return x === ind; });
                if (str !== this.temp) {
                    this.i = 0;
                    this.def = suraBismillah[ind1] - suraBismillah[ind1 - 1];
                    this.temp = str;
                }
                this.i++;
                var suraAyaNumber = this.getSura(ind - this.def + this.i).ayas;
            }
        }
        else {
            if (ind < 83) {
                var suraTanziLocation = this.getSura(ind).tanzilLocation;
                var suraArabicName = this.getSura(ind).name;
            }
            else {
                var suraTanziLocation = this.getSura(ind - this.def + this.i).tanzilLocation;
                var suraArabicName = this.getSura(ind - this.def + this.i).name;
            }
        }
        return { a: suraAyaNumber, b: suraTanziLocation, c: suraArabicName };
    };
    QuranService.prototype.getAllSura = function () {
        var suraList = [];
        for (var i = 1; i < 115; i++)
            suraList.push({ name: this.getSura(i).name, number: i, numberAr: i.toLocaleString('ar') });
        return suraList;
    };
    return QuranService;
}());
QuranService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Injectable */])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["e" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["e" /* Http */]) === "function" && _a || Object])
], QuranService);

var _a;
//# sourceMappingURL=C:/Users/ali71/WebstormProjects/quran-together/src/quran.service.js.map

/***/ }),

/***/ 340:
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = 340;


/***/ }),

/***/ 341:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__polyfills_ts__ = __webpack_require__(360);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__(345);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__(359);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app___ = __webpack_require__(349);





if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__angular_core__["a" /* enableProdMode */])();
}
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_4__app___["a" /* AppModule */]);
//# sourceMappingURL=C:/Users/ali71/WebstormProjects/quran-together/src/main.js.map

/***/ }),

/***/ 347:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(123);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_platform_browser_animations__ = __webpack_require__(346);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_material__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_hammerjs__ = __webpack_require__(535);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_hammerjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_hammerjs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_ng2_device_detector__ = __webpack_require__(285);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__angular_router__ = __webpack_require__(124);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__app_component__ = __webpack_require__(125);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__quran_service__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__static_page_static_page_component__ = __webpack_require__(356);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__nav_nav_component__ = __webpack_require__(350);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__pages_pages_component__ = __webpack_require__(353);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__aya_number_sign_aya_number_sign_component__ = __webpack_require__(348);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__number_translator_number_translator_component__ = __webpack_require__(351);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__page_info_table_page_info_table_component__ = __webpack_require__(352);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__qhizb_sajda_tooltip_sign_qhizb_sajda_tooltip_sign_component__ = __webpack_require__(354);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__sura_bismillah_info_table_sura_bismillah_info_table_component__ = __webpack_require__(358);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__registration_registration_component__ = __webpack_require__(129);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__auth_service__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__http_service__ = __webpack_require__(91);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__msg_service__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__styling_service__ = __webpack_require__(357);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__windowRef__ = __webpack_require__(72);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__khatm_khatm_component__ = __webpack_require__(127);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__khatm_service__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__commitment_commitment_component__ = __webpack_require__(126);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__route_route_component__ = __webpack_require__(355);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





























var appRoute = [
    { path: '', component: __WEBPACK_IMPORTED_MODULE_13__pages_pages_component__["a" /* PagesComponent */], pathMatch: 'full' },
    { path: 'khatm/:khlink', component: __WEBPACK_IMPORTED_MODULE_28__route_route_component__["a" /* RouteComponent */] },
];
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["b" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_9__app_component__["a" /* AppComponent */],
            __WEBPACK_IMPORTED_MODULE_11__static_page_static_page_component__["a" /* StaticPageComponent */],
            __WEBPACK_IMPORTED_MODULE_12__nav_nav_component__["a" /* NavComponent */],
            __WEBPACK_IMPORTED_MODULE_13__pages_pages_component__["a" /* PagesComponent */],
            __WEBPACK_IMPORTED_MODULE_14__aya_number_sign_aya_number_sign_component__["a" /* AyaNumberSignComponent */],
            __WEBPACK_IMPORTED_MODULE_15__number_translator_number_translator_component__["a" /* NumberTranslatorComponent */],
            __WEBPACK_IMPORTED_MODULE_16__page_info_table_page_info_table_component__["a" /* PageInfoTableComponent */],
            __WEBPACK_IMPORTED_MODULE_17__qhizb_sajda_tooltip_sign_qhizb_sajda_tooltip_sign_component__["a" /* QhizbSajdaTooltipSignComponent */],
            __WEBPACK_IMPORTED_MODULE_18__sura_bismillah_info_table_sura_bismillah_info_table_component__["a" /* SuraBismillahInfoTableComponent */],
            __WEBPACK_IMPORTED_MODULE_19__registration_registration_component__["a" /* RegistrationComponent */],
            __WEBPACK_IMPORTED_MODULE_25__khatm_khatm_component__["a" /* KhatmComponent */],
            __WEBPACK_IMPORTED_MODULE_27__commitment_commitment_component__["a" /* CommitmentComponent */],
            __WEBPACK_IMPORTED_MODULE_28__route_route_component__["a" /* RouteComponent */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormsModule */],
            __WEBPACK_IMPORTED_MODULE_3__angular_http__["a" /* HttpModule */],
            __WEBPACK_IMPORTED_MODULE_5__angular_material__["a" /* MdButtonModule */],
            __WEBPACK_IMPORTED_MODULE_5__angular_material__["b" /* MdDialogModule */],
            __WEBPACK_IMPORTED_MODULE_5__angular_material__["c" /* MdInputModule */],
            __WEBPACK_IMPORTED_MODULE_5__angular_material__["d" /* MdGridListModule */],
            __WEBPACK_IMPORTED_MODULE_5__angular_material__["e" /* MdSnackBarModule */],
            __WEBPACK_IMPORTED_MODULE_5__angular_material__["f" /* MdSidenavModule */],
            __WEBPACK_IMPORTED_MODULE_5__angular_material__["g" /* MdSelectModule */],
            __WEBPACK_IMPORTED_MODULE_5__angular_material__["h" /* MdRadioModule */],
            __WEBPACK_IMPORTED_MODULE_5__angular_material__["i" /* MdCheckboxModule */],
            __WEBPACK_IMPORTED_MODULE_5__angular_material__["j" /* MdListModule */],
            __WEBPACK_IMPORTED_MODULE_5__angular_material__["k" /* MdIconModule */],
            __WEBPACK_IMPORTED_MODULE_4__angular_platform_browser_animations__["a" /* BrowserAnimationsModule */],
            __WEBPACK_IMPORTED_MODULE_7_ng2_device_detector__["a" /* Ng2DeviceDetectorModule */].forRoot(),
            __WEBPACK_IMPORTED_MODULE_8__angular_router__["a" /* RouterModule */].forRoot(appRoute),
        ],
        providers: [
            __WEBPACK_IMPORTED_MODULE_10__quran_service__["a" /* QuranService */],
            __WEBPACK_IMPORTED_MODULE_20__auth_service__["a" /* AuthService */],
            __WEBPACK_IMPORTED_MODULE_21__http_service__["a" /* HttpService */],
            __WEBPACK_IMPORTED_MODULE_22__msg_service__["a" /* MsgService */],
            __WEBPACK_IMPORTED_MODULE_23__styling_service__["a" /* StylingService */],
            __WEBPACK_IMPORTED_MODULE_24__windowRef__["a" /* WindowRef */],
            __WEBPACK_IMPORTED_MODULE_26__khatm_service__["a" /* KhatmService */],
        ],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_9__app_component__["a" /* AppComponent */]],
        entryComponents: [__WEBPACK_IMPORTED_MODULE_19__registration_registration_component__["a" /* RegistrationComponent */], __WEBPACK_IMPORTED_MODULE_25__khatm_khatm_component__["a" /* KhatmComponent */], __WEBPACK_IMPORTED_MODULE_27__commitment_commitment_component__["a" /* CommitmentComponent */]]
    })
], AppModule);

//# sourceMappingURL=C:/Users/ali71/WebstormProjects/quran-together/src/app.module.js.map

/***/ }),

/***/ 348:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(6);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AyaNumberSignComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

//TODO: Adding on-copy event to remove aya sign and keep aya number
var AyaNumberSignComponent = (function () {
    function AyaNumberSignComponent() {
    }
    Object.defineProperty(AyaNumberSignComponent.prototype, "needntBorder", {
        get: function () {
            return this.fontFamily === 'quran-uthmanic' || this.fontFamily === 'me-quran';
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(AyaNumberSignComponent.prototype, "farsiNums", {
        get: function () {
            return this.fontFamily === 'qalam';
        },
        enumerable: true,
        configurable: true
    });
    AyaNumberSignComponent.prototype.ngOnInit = function () {
    };
    return AyaNumberSignComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["O" /* Input */])(),
    __metadata("design:type", Object)
], AyaNumberSignComponent.prototype, "ayanumber", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["O" /* Input */])(),
    __metadata("design:type", Object)
], AyaNumberSignComponent.prototype, "reverse", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["O" /* Input */])(),
    __metadata("design:type", Object)
], AyaNumberSignComponent.prototype, "fontFamily", void 0);
AyaNumberSignComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_12" /* Component */])({
        selector: 'app-aya-number-sign',
        template: __webpack_require__(540),
        styles: [__webpack_require__(513)]
    }),
    __metadata("design:paramtypes", [])
], AyaNumberSignComponent);

//# sourceMappingURL=C:/Users/ali71/WebstormProjects/quran-together/src/aya-number-sign.component.js.map

/***/ }),

/***/ 349:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__app_component__ = __webpack_require__(125);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(347);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_1__app_module__["a"]; });


//# sourceMappingURL=C:/Users/ali71/WebstormProjects/quran-together/src/index.js.map

/***/ }),

/***/ 350:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__quran_service__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__quran_data__ = __webpack_require__(128);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__registration_registration_component__ = __webpack_require__(129);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_material__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__auth_service__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__windowRef__ = __webpack_require__(72);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__khatm_khatm_component__ = __webpack_require__(127);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__khatm_service__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__msg_service__ = __webpack_require__(57);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NavComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
//Todo : Change testFunction name..










var navTypes = ['سورة', 'جزء', 'حزب'];
var navTypeEq = ['sura', 'juz', 'hizb'];
var NavComponent = (function () {
    function NavComponent(quranService, dialog, authService, winRef, khatmService, msgService) {
        this.quranService = quranService;
        this.dialog = dialog;
        this.authService = authService;
        this.winRef = winRef;
        this.khatmService = khatmService;
        this.msgService = msgService;
        this.closeNav = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["F" /* EventEmitter */]();
        this.suraJuzPageHizbArray = [[], [], []];
        this.navTypeIndex = 0;
        this.zoomPercent = 100;
        this.aya = new __WEBPACK_IMPORTED_MODULE_2__quran_data__["b" /* QuranReference */]();
        this.navValueNumber = 1;
        this.tartilInfo = __WEBPACK_IMPORTED_MODULE_2__quran_data__["a" /* QURAN_DATA */].tartilInfo;
        this.tartilQuality = [];
        this.tartil = [];
        this.ayaCnt = 1;
        this.suraCnt = 1;
        this.ayaCntLast = 1;
        this.suraCntLast = 2;
        this.lastSectionAya = 7;
        this.suraTemp = ['', '', ''];
        this.ayaTemp = ['', '', ''];
        this.addressStr = ['', '', ''];
        this.shortAddressStr = ['', '', ''];
        this.j = 3;
        this.playFlag = false;
        this.sarehFlag = false;
        this.volumeFlag = true;
        this.khatms = [];
        this.active = false;
    }
    NavComponent.prototype.zoomOut = function () {
        var curZoom = this.quranService.zoomOut();
        this.changeZoomNumber(curZoom);
        this.menuClick();
    };
    NavComponent.prototype.zoomIn = function () {
        var curZoom = this.quranService.zoomIn();
        this.changeZoomNumber(curZoom);
        this.menuClick();
    };
    NavComponent.prototype.menuClick = function () {
        this.active = !this.active;
    };
    NavComponent.prototype.resetZoom = function () {
        var curZoom = this.quranService.resetZoom();
        this.changeZoomNumber(curZoom);
        this.menuClick();
    };
    NavComponent.prototype.changeZoomNumber = function (curZoom) {
        this.zoomPercent = Math.round(Math.pow(1.25, curZoom) * 100);
    };
    NavComponent.prototype.changeFont = function () {
        this.quranService.fontChange();
        this.menuClick();
    };
    NavComponent.prototype.nightMode = function () {
        this.quranService.nightModeSwitch();
        // this.menuClick();
    };
    NavComponent.prototype.changeNavType = function () {
        this.navTypeIndex++;
        if (this.navTypeIndex === navTypes.length)
            this.navTypeIndex = 0;
        this.navType = navTypes[this.navTypeIndex];
        this.navFromAya();
    };
    NavComponent.prototype.navFromAya = function () {
        var val = this.quranService.sectionForAya(navTypeEq[this.navTypeIndex], this.aya);
        this.inputbutton.nativeElement.value = this.quranService.sectionForAya('page', this.aya).num;
        if (!val.text) {
            this.navValue = '( ' + val.num.toLocaleString('ar') + ' )';
        }
        else {
            this.navValue = val.num.toLocaleString('ar') + ' - ' + val.text;
        }
        this.navValueNumber = +val.num;
    };
    NavComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.height = this.winRef.getWindow().innerHeight + "px";
        this.winRef.getWindow().onresize = function (e) {
            _this.height = _this.winRef.getWindow().innerHeight + "px";
        };
        this.authService.isLoggedIn.subscribe(function (data) {
            console.log('isLoggedIn: ' + data);
            _this.isLoggedIn = data;
        });
        this.khatmService.khatms.subscribe(function (data) {
            _this.khatms = [];
            for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
                var item = data_1[_i];
                _this.khatms.push(item);
            }
        }, function (err) {
            console.log(err);
            _this.khatms = [];
        });
        this.authService.user.subscribe(function (data) {
            if (data !== null && data.email !== null && data.email !== undefined)
                _this.khatmService.loadKhatm(data.email);
        }, function (err) {
            console.log(err.message);
        });
        this.suraTemp[0] = '001';
        this.ayaTemp[0] = '001';
        for (var i = 1; i < 115; i++)
            this.suraJuzPageHizbArray[0].push(i.toLocaleString('ar') + ' - ' + this.quranService.getSura(i).name);
        for (var j = 1; j < 31; j++)
            this.suraJuzPageHizbArray[1].push('( ' + j.toLocaleString('ar') + ' )');
        for (var k = 1; k < 61; k++)
            this.suraJuzPageHizbArray[2].push('( ' + k.toLocaleString('ar') + ' )');
        this.tartilInfo.sort(function (x, y) { return parseInt(x.bitrate) < parseInt(y.bitrate) || (parseInt(x.bitrate) === parseInt(y.bitrate) && x.name < y.name); });
        this.tartilQuality = this.tartilInfo.map(function (el) { return el.quality; }).filter(function (e, i, arr) { return arr.lastIndexOf(e) === i; });
        var q = this.tartilQuality[0];
        this.qualityValue = q;
        this.changeQuality(q);
        this.nightModeVar = this.quranService.nightMode;
        this.navType = navTypes[this.navTypeIndex];
        this.aya.aya = 1;
        this.aya.sura = 1;
        this.quranService.aya$
            .subscribe(function (aya) {
            if (aya) {
                _this.aya = aya;
                _this.navFromAya();
                if (_this.sarehFlag) {
                    var andis;
                    if (_this.j === 3)
                        andis = 0;
                    else if (_this.j === 2)
                        andis = 1;
                    else if (_this.j === 1)
                        andis = 2;
                    var p = _this.quranService.sectionForAya('page', _this.aya).num;
                    _this.suraCnt = __WEBPACK_IMPORTED_MODULE_2__quran_data__["a" /* QURAN_DATA */].page[p - 1].sura;
                    _this.ayaCnt = __WEBPACK_IMPORTED_MODULE_2__quran_data__["a" /* QURAN_DATA */].page[p - 1].aya;
                    _this.suraCntLast = 114;
                    _this.ayaCntLast = 7;
                    if (_this.suraCnt !== _this.suraCntLast)
                        _this.lastSectionAya = _this.quranService.getSura(_this.suraCnt).ayas;
                    else
                        _this.lastSectionAya = _this.ayaCntLast - 1;
                    _this.suraTemp[andis] = _this.setSuraAyaNumber(_this.suraCnt);
                    _this.ayaTemp[andis] = _this.setSuraAyaNumber(_this.ayaCnt);
                    _this.addressStr[andis] = "http://www.everyayah.com/data/" + _this.tartilTemp + "/" + _this.suraTemp[andis] + _this.ayaTemp[andis] + ".mp3";
                    _this.testFunction();
                    _this.setAutoPlayRead();
                }
            }
        });
        this.quranService.nightMode$
            .subscribe(function (m) {
            _this.nightModeVar = m;
        });
        this.onLoadFirstPage();
    };
    NavComponent.prototype.onSelectChange = function (newValue) {
        this.sarehFlag = false;
        var andis;
        if (this.j === 3)
            andis = 0;
        else if (this.j === 2)
            andis = 1;
        else if (this.j === 1)
            andis = 2;
        this.navValueNumber = this.suraJuzPageHizbArray[this.navTypeIndex].findIndex(function (x) { return x === newValue; }) + 1;
        if (this.navTypeIndex === 0) {
            this.suraCnt = this.navValueNumber;
            this.suraCntLast = this.navValueNumber + 1;
            this.ayaCnt = 1;
            this.ayaCntLast = 1;
        }
        else if (this.navTypeIndex === 1) {
            this.suraCnt = __WEBPACK_IMPORTED_MODULE_2__quran_data__["a" /* QURAN_DATA */].juz[this.navValueNumber - 1].sura;
            this.ayaCnt = __WEBPACK_IMPORTED_MODULE_2__quran_data__["a" /* QURAN_DATA */].juz[this.navValueNumber - 1].aya;
            if (this.navValueNumber === 30) {
                this.suraCntLast = 114;
                this.ayaCntLast = 7;
            }
            else {
                this.suraCntLast = __WEBPACK_IMPORTED_MODULE_2__quran_data__["a" /* QURAN_DATA */].juz[this.navValueNumber].sura;
                this.ayaCntLast = __WEBPACK_IMPORTED_MODULE_2__quran_data__["a" /* QURAN_DATA */].juz[this.navValueNumber].aya;
            }
        }
        else {
            this.suraCnt = __WEBPACK_IMPORTED_MODULE_2__quran_data__["a" /* QURAN_DATA */].qhizb[(this.navValueNumber - 1) * 4].sura;
            this.ayaCnt = __WEBPACK_IMPORTED_MODULE_2__quran_data__["a" /* QURAN_DATA */].qhizb[(this.navValueNumber - 1) * 4].aya;
            if (this.navValueNumber === 60) {
                this.suraCntLast = 114;
                this.ayaCntLast = 7;
            }
            else {
                this.suraCntLast = __WEBPACK_IMPORTED_MODULE_2__quran_data__["a" /* QURAN_DATA */].qhizb[(this.navValueNumber) * 4].sura;
                this.ayaCntLast = __WEBPACK_IMPORTED_MODULE_2__quran_data__["a" /* QURAN_DATA */].qhizb[(this.navValueNumber) * 4].aya;
            }
        }
        this.suraTemp[andis] = this.setSuraAyaNumber(this.suraCnt);
        this.ayaTemp[andis] = this.setSuraAyaNumber(this.ayaCnt);
        if (this.suraCnt !== this.suraCntLast)
            this.lastSectionAya = this.quranService.getSura(this.suraCnt).ayas;
        else
            this.lastSectionAya = this.ayaCntLast - 1;
        this.addressStr[andis] = "http://www.everyayah.com/data/" + this.tartilTemp + "/" + this.suraTemp[andis] + this.ayaTemp[andis] + ".mp3";
        this.testFunction();
        this.quranService.goTo(navTypeEq[this.navTypeIndex], this.navValueNumber);
        this.setAutoPlayRead();
    };
    NavComponent.prototype.setAutoPlayRead = function () {
        if (this.j === 3) {
            this.aud0.nativeElement.autoplay = this.playFlag;
            this.aud0.nativeElement.src = this.addressStr[0];
        }
        else if (this.j === 2) {
            this.aud1.nativeElement.autoplay = this.playFlag;
            this.aud1.nativeElement.src = this.addressStr[1];
        }
        else if (this.j === 1) {
            this.aud2.nativeElement.autoplay = this.playFlag;
            this.aud2.nativeElement.src = this.addressStr[2];
        }
        if (this.sarehFlag === false)
            this.sarehFlag = true;
    };
    NavComponent.prototype.startAyaVoice = function () {
        this.playFlag = !this.playFlag;
        if (this.j === 3) {
            if (!this.playFlag) {
                this.aud0.nativeElement.pause();
                this.aud1.nativeElement.pause();
                this.aud2.nativeElement.pause();
            }
            else
                this.aud0.nativeElement.play();
        }
        else if (this.j === 2) {
            if (!this.playFlag) {
                this.aud0.nativeElement.pause();
                this.aud1.nativeElement.pause();
                this.aud2.nativeElement.pause();
            }
            else
                this.aud1.nativeElement.play();
        }
        else if (this.j === 1) {
            if (!this.playFlag) {
                this.aud0.nativeElement.pause();
                this.aud1.nativeElement.pause();
                this.aud2.nativeElement.pause();
            }
            else
                this.aud2.nativeElement.play();
        }
    };
    NavComponent.prototype.readAyaOneByOne = function () {
        var andis;
        if (this.j === 3)
            andis = 0;
        else if (this.j === 2)
            andis = 1;
        else if (this.j === 1)
            andis = 2;
        this.suraTemp[andis] = this.setSuraAyaNumber(this.suraCnt);
        this.ayaCnt++;
        if (this.ayaCnt <= this.lastSectionAya) {
            this.ayaTemp[andis] = this.setSuraAyaNumber(this.ayaCnt);
        }
        else {
            this.suraCnt++;
            if (this.suraCnt < this.suraCntLast) {
                this.suraTemp[andis] = this.setSuraAyaNumber(this.suraCnt);
                this.ayaCnt = 1;
                this.ayaTemp[andis] = this.setSuraAyaNumber(this.ayaCnt);
                this.lastSectionAya = this.quranService.getSura(this.suraCnt).ayas;
            }
            else if (this.suraCnt === this.suraCntLast) {
                this.suraTemp[andis] = this.setSuraAyaNumber(this.suraCnt);
                this.ayaCnt = 1;
                if (this.ayaCnt < this.ayaCntLast) {
                    this.ayaTemp[andis] = this.setSuraAyaNumber(this.ayaCnt);
                    this.lastSectionAya = this.ayaCntLast - 1;
                }
                else {
                    this.ayaTemp[andis] = '';
                }
            }
            else
                this.ayaTemp[andis] = '';
        }
        this.addressStr[andis] = "http://www.everyayah.com/data/" + this.tartilTemp + "/" + this.suraTemp[andis] + this.ayaTemp[andis] + ".mp3";
        if (andis === 0) {
            this.aud0.nativeElement.play();
            this.aud0.nativeElement.pause();
            // setTimeout(()=>this.aud0.nativeElement.pause(),200);
        }
        else if (andis === 1) {
            this.aud1.nativeElement.play();
            this.aud1.nativeElement.pause();
            // setTimeout(()=>this.aud1.nativeElement.pause(),200);
        }
        else if (andis === 2) {
            this.aud2.nativeElement.play();
            this.aud2.nativeElement.pause();
            // setTimeout(()=>this.aud2.nativeElement.pause(),200);
        }
        if (this.playFlag) {
            this.j--;
            if (this.j === 0) {
                this.j = 3;
            }
        }
        this.setAutoPlayRead();
    };
    NavComponent.prototype.goToEnteredPage = function () {
        this.sarehFlag = false;
        var andis;
        if (this.j === 3)
            andis = 0;
        else if (this.j === 2)
            andis = 1;
        else if (this.j === 1)
            andis = 2;
        var p = this.inputbutton.nativeElement.value;
        if (p > 604 || p < 0 || isNaN(p)) {
            this.inputbutton.nativeElement.select();
            alert("Enter a valid number!");
            this.sarehFlag = true;
        }
        else {
            this.suraCnt = __WEBPACK_IMPORTED_MODULE_2__quran_data__["a" /* QURAN_DATA */].page[p - 1].sura;
            this.ayaCnt = __WEBPACK_IMPORTED_MODULE_2__quran_data__["a" /* QURAN_DATA */].page[p - 1].aya;
            this.suraCntLast = __WEBPACK_IMPORTED_MODULE_2__quran_data__["a" /* QURAN_DATA */].page[p].sura;
            this.ayaCntLast = __WEBPACK_IMPORTED_MODULE_2__quran_data__["a" /* QURAN_DATA */].page[p].aya;
            this.suraTemp[andis] = this.setSuraAyaNumber(this.suraCnt);
            this.ayaTemp[andis] = this.setSuraAyaNumber(this.ayaCnt);
            if (this.suraCnt !== this.suraCntLast)
                this.lastSectionAya = this.quranService.getSura(this.suraCnt).ayas;
            else
                this.lastSectionAya = this.ayaCntLast - 1;
            this.addressStr[andis] = "http://www.everyayah.com/data/" + this.tartilTemp + "/" + this.suraTemp[andis] + this.ayaTemp[andis] + ".mp3";
            this.testFunction();
            this.quranService.goTo('page', p);
            this.setAutoPlayRead();
        }
    };
    NavComponent.prototype.onLoadFirstPage = function () {
        this.addressStr[0] = "http://www.everyayah.com/data/Abdul_Basit_Mujawwad_128kbps/001001.mp3";
        this.addressStr[1] = "http://www.everyayah.com/data/Abdul_Basit_Mujawwad_128kbps/001002.mp3";
        this.addressStr[2] = "http://www.everyayah.com/data/Abdul_Basit_Mujawwad_128kbps/001003.mp3";
    };
    NavComponent.prototype.setSuraAyaNumber = function (num) {
        var numTemp = '';
        if (num < 10)
            numTemp = "00" + num.toString();
        else if (num < 100)
            numTemp = "0" + num.toString();
        else
            numTemp = num.toString();
        return numTemp;
    };
    NavComponent.prototype.changeTelavat = function (t) {
        if (t === void 0) { t = this.tlvtValue; }
        var andis;
        var a;
        if (this.j === 3)
            andis = 0;
        else if (this.j === 2)
            andis = 1;
        else if (this.j === 1)
            andis = 2;
        this.tartilTemp = t;
        this.addressStr[andis] = "http://www.everyayah.com/data/" + this.tartilTemp + "/" + this.suraTemp[andis] + this.ayaTemp[andis] + ".mp3";
        for (a = 0; a < 3; a++) {
            if (a === andis)
                continue;
            else {
                this.addressStr[a] = "http://www.everyayah.com/data/" + this.tartilTemp + "/" + this.suraTemp[a] + this.ayaTemp[a] + ".mp3";
            }
        }
        this.setAutoPlayRead();
    };
    NavComponent.prototype.changeQuality = function (q) {
        if (q === void 0) { q = this.qualityValue; }
        this.tartil = this.tartilInfo.filter(function (el) { return el.quality === q; });
        this.tlvtValue = this.tartil[0].subfolder;
        this.changeTelavat(this.tartil[0].subfolder);
    };
    NavComponent.prototype.changeVolume = function () {
        this.volumeFlag = !this.volumeFlag;
        if (this.volumeFlag) {
            this.aud0.nativeElement.muted = false;
            this.aud1.nativeElement.muted = false;
            this.aud2.nativeElement.muted = false;
        }
        else {
            this.aud0.nativeElement.muted = true;
            this.aud1.nativeElement.muted = true;
            this.aud2.nativeElement.muted = true;
        }
    };
    NavComponent.prototype.testFunction = function () {
        var a = [];
        if (this.j === 3)
            a = [1, 2];
        else if (this.j === 2)
            a = [2, 0];
        else
            a = [0, 1];
        for (var i = 0; i < 2; i++) {
            this.suraTemp[a[i]] = this.setSuraAyaNumber(this.suraCnt);
            this.ayaCnt++;
            if (this.ayaCnt <= this.lastSectionAya) {
                this.ayaTemp[a[i]] = this.setSuraAyaNumber(this.ayaCnt);
            }
            else {
                this.suraCnt++;
                if (this.suraCnt < this.suraCntLast) {
                    this.suraTemp[a[i]] = this.setSuraAyaNumber(this.suraCnt);
                    this.ayaCnt = 1;
                    this.ayaTemp[a[i]] = this.setSuraAyaNumber(this.ayaCnt);
                    this.lastSectionAya = this.quranService.getSura(this.suraCnt).ayas;
                }
                else if (this.suraCnt === this.suraCntLast) {
                    this.suraTemp[a[i]] = this.setSuraAyaNumber(this.suraCnt);
                    this.ayaCnt = 1;
                    if (this.ayaCnt < this.ayaCntLast) {
                        this.ayaTemp[a[i]] = this.setSuraAyaNumber(this.ayaCnt);
                        this.lastSectionAya = this.ayaCntLast - 1;
                    }
                    else {
                        this.ayaTemp[a[i]] = '';
                    }
                }
                else {
                    this.ayaTemp[a[i]] = '';
                }
            }
            this.addressStr[a[i]] = "http://www.everyayah.com/data/" + this.tartilTemp + "/" + this.suraTemp[a[i]] + this.ayaTemp[a[i]] + ".mp3";
        }
    };
    NavComponent.prototype.register = function () {
        var dialogRef = this.dialog.open(__WEBPACK_IMPORTED_MODULE_3__registration_registration_component__["a" /* RegistrationComponent */], {
            height: '400px',
            width: '300px'
        });
        this.closeNav.emit(true);
    };
    NavComponent.prototype.createKhatm = function () {
        var dialogRef = this.dialog.open(__WEBPACK_IMPORTED_MODULE_7__khatm_khatm_component__["a" /* KhatmComponent */], {
            height: '600px',
            width: '400px',
            data: {
                isNew: true,
                khatm: null
            }
        });
        this.closeNav.emit(true);
    };
    NavComponent.prototype.openKhatm = function (khatm) {
        var dialogRef = this.dialog.open(__WEBPACK_IMPORTED_MODULE_7__khatm_khatm_component__["a" /* KhatmComponent */], {
            height: '600px',
            width: '400px',
            data: {
                isNew: false,
                khatm: khatm
            }
        });
    };
    NavComponent.prototype.logout = function () {
        this.authService.logout();
    };
    return NavComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_14" /* ViewChild */])('aud0'),
    __metadata("design:type", Object)
], NavComponent.prototype, "aud0", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_14" /* ViewChild */])('aud1'),
    __metadata("design:type", Object)
], NavComponent.prototype, "aud1", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_14" /* ViewChild */])('aud2'),
    __metadata("design:type", Object)
], NavComponent.prototype, "aud2", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_14" /* ViewChild */])('autoPlaySelect'),
    __metadata("design:type", Object)
], NavComponent.prototype, "autoPlaySelect", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_14" /* ViewChild */])('tlvt'),
    __metadata("design:type", Object)
], NavComponent.prototype, "tlvt", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_14" /* ViewChild */])('quality'),
    __metadata("design:type", Object)
], NavComponent.prototype, "quality", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_14" /* ViewChild */])('inputbutton'),
    __metadata("design:type", Object)
], NavComponent.prototype, "inputbutton", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_5" /* Output */])('closeNav'),
    __metadata("design:type", Object)
], NavComponent.prototype, "closeNav", void 0);
NavComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_12" /* Component */])({
        selector: 'app-nav',
        template: __webpack_require__(543),
        styles: [__webpack_require__(516)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__quran_service__["a" /* QuranService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__quran_service__["a" /* QuranService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_4__angular_material__["n" /* MdDialog */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__angular_material__["n" /* MdDialog */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_5__auth_service__["a" /* AuthService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__auth_service__["a" /* AuthService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_6__windowRef__["a" /* WindowRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6__windowRef__["a" /* WindowRef */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_8__khatm_service__["a" /* KhatmService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_8__khatm_service__["a" /* KhatmService */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_9__msg_service__["a" /* MsgService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_9__msg_service__["a" /* MsgService */]) === "function" && _f || Object])
], NavComponent);

var _a, _b, _c, _d, _e, _f;
//# sourceMappingURL=C:/Users/ali71/WebstormProjects/quran-together/src/nav.component.js.map

/***/ }),

/***/ 351:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(6);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NumberTranslatorComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var NumberTranslatorComponent = (function () {
    function NumberTranslatorComponent() {
        this._farsiNums = false;
        this.ayaTranslated = '';
        this.reverse = false;
    }
    Object.defineProperty(NumberTranslatorComponent.prototype, "farsiNums", {
        get: function () {
            return this._farsiNums;
        },
        set: function (isFarsi) {
            if (isFarsi !== this._farsiNums) {
                this._farsiNums = isFarsi;
                this.inputNumber = this._input;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NumberTranslatorComponent.prototype, "inputNumber", {
        get: function () {
            return this._input;
        },
        set: function (input) {
            this._input = input;
            if (input) {
                var persianDigits = ['\u0660', '\u0661', '\u0662', '\u0663', '\u0664', '\u0665', '\u0666', '\u0667', '\u0668', '\u0669'];
                if (this.farsiNums)
                    persianDigits = '۰۱۲۳۴۵۶۷۸۹'.split('');
                input = input.toString().split('').map(function (e) { return persianDigits[+e]; });
                if (this.reverse)
                    input = input.reverse();
                this.ayaTranslated = input.join('');
            }
        },
        enumerable: true,
        configurable: true
    });
    NumberTranslatorComponent.prototype.ngOnInit = function () {
    };
    return NumberTranslatorComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["O" /* Input */])(),
    __metadata("design:type", Object)
], NumberTranslatorComponent.prototype, "reverse", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["O" /* Input */])('farsiNums'),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], NumberTranslatorComponent.prototype, "farsiNums", null);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["O" /* Input */])('inputNumber'),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], NumberTranslatorComponent.prototype, "inputNumber", null);
NumberTranslatorComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_12" /* Component */])({
        selector: 'app-number-translator',
        template: __webpack_require__(544),
        styles: [__webpack_require__(517)]
    }),
    __metadata("design:paramtypes", [])
], NumberTranslatorComponent);

//# sourceMappingURL=C:/Users/ali71/WebstormProjects/quran-together/src/number-translator.component.js.map

/***/ }),

/***/ 352:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__quran_service__ = __webpack_require__(26);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PageInfoTableComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var PageInfoTableComponent = (function () {
    function PageInfoTableComponent(quranService) {
        this.quranService = quranService;
        this.pagenumber = 0;
        this.layer = 0;
        this.pageJuzNumber = 1;
    }
    PageInfoTableComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.nightMode = this.quranService.nightMode;
        this.suraname = '';
        this.quranService.contentChanged$
            .subscribe(function (layer) {
            _this.pageJuzNumber = _this.quranService.pageJuzCheck(_this.pagenumber);
            if (layer === _this.layer) {
                _this.suraname += ' ';
                _this.suraname.trim();
            }
            _this.suraorderAr = _this.suraorder ? _this.suraorder.toLocaleString('ar') : '';
            _this.pageJuzNumberAr = _this.pageJuzNumber ? _this.pageJuzNumber.toLocaleString('ar') : '';
            _this.pagenumberAr = _this.pagenumber ? _this.pagenumber.toLocaleString('ar') : '';
        });
        this.quranService.nightMode$
            .subscribe(function (m) {
            _this.nightMode = m;
        });
    };
    return PageInfoTableComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["O" /* Input */])(),
    __metadata("design:type", Object)
], PageInfoTableComponent.prototype, "suraname", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["O" /* Input */])(),
    __metadata("design:type", Object)
], PageInfoTableComponent.prototype, "suraorder", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["O" /* Input */])(),
    __metadata("design:type", Object)
], PageInfoTableComponent.prototype, "pagenumber", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["O" /* Input */])(),
    __metadata("design:type", Object)
], PageInfoTableComponent.prototype, "layer", void 0);
PageInfoTableComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_12" /* Component */])({
        selector: 'app-page-info-table',
        template: __webpack_require__(545),
        styles: [__webpack_require__(518)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__quran_service__["a" /* QuranService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__quran_service__["a" /* QuranService */]) === "function" && _a || Object])
], PageInfoTableComponent);

var _a;
//# sourceMappingURL=C:/Users/ali71/WebstormProjects/quran-together/src/page-info-table.component.js.map

/***/ }),

/***/ 353:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__quran_service__ = __webpack_require__(26);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PagesComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var fonts = ['quran', 'quran-uthmanic', 'quran-uthmanic-bold', 'qalam', 'me-quran'];
var PagesComponent = (function () {
    function PagesComponent(quranService) {
        this.quranService = quranService;
        this.defaultWidth = 650;
        this.defaultHeight = 866;
        this.defaultTextWidth = 567;
        this.defaultTextHeight = 800;
        this.quranPage = 1;
        this.pageAyas = [[], [], []];
        this.horizontal = false;
        this.activeLayer = 0;
        this.layers = [0, 1, 2];
        this.halfPage = [[], [], []];
        this.suraName = [[], [], []];
        this.suraOrder = [[], [], []];
        this.tanzilLocation = [[], [], []];
        this.quranPages = [[], [], []];
        this.mobile = false;
        this.zoom = 1;
        this.fontFamily = 'quran';
        this.naskhIncompatible = false;
        this.nigthMode = false;
    }
    PagesComponent.prototype.getPageAyas = function (p) {
        return this.quranService.applySectionFilter('page', this.ayas, p);
    };
    PagesComponent.prototype.loadPage = function (layer, direction) {
        var _this = this;
        this.pageAyas[layer] = [];
        this.halfPage[layer] = [];
        this.suraName[layer] = [];
        this.suraOrder[layer] = [];
        this.tanzilLocation[layer] = [];
        this.quranPages[layer] = [];
        this.pagesArray.forEach(function (p) {
            var quranPageNum = +_this.quranPage + (direction * _this.pageNum) + p;
            var ayas = _this.getPageAyas(quranPageNum);
            var suraOrders = ayas.map(function (e) { return e.sura; }).filter(function (e, i, v) { return v.indexOf(e) === i; });
            var suras = suraOrders.map(function (e) { return _this.quranService.getSura(e); });
            var suraNames = suras.map(function (e) { return e.name; });
            var meccan = 'مکي';
            var medinan = 'مدني';
            var suraTanzil = suras.map(function (e) { return e.tanzilLocation === 'Medinan' ? medinan : meccan; });
            var suraName = suraNames.pop();
            var suraOrder = suraOrders.pop();
            _this.pageAyas[layer].push(ayas);
            _this.halfPage[layer].push(quranPageNum < 3);
            _this.suraName[layer].push(suraName);
            _this.suraOrder[layer].push(suraOrder);
            _this.tanzilLocation[layer].push(suraTanzil.pop());
            _this.quranPages[layer].push(quranPageNum);
        });
        setTimeout(function () { return _this.quranService.contentChange(layer); }, 0);
    };
    PagesComponent.prototype.changeCurAya = function () {
        this.quranService.changeCurAya(this.pageAyas[this.activeLayer][0].slice(-1)[0]);
    };
    PagesComponent.prototype.loadAllPages = function () {
        this.loadPage(0, 0);
        this.loadPage(1, 1);
        this.loadPage(2, -1);
        this.activeLayer = 0;
        this.changeCurAya();
    };
    PagesComponent.prototype.goBack = function () {
        if (this.quranPage > this.pageNum) {
            this.quranPage -= this.pageNum;
            this.activeLayer = (this.activeLayer + 2) % 3;
            var nextLayer = (this.activeLayer + 2) % 3;
            this.loadPage(nextLayer, -1);
        }
        else {
            this.quranPage = 1;
            this.loadPage(0, 0);
            this.loadPage(1, 1);
            this.activeLayer = 0;
        }
        this.changeCurAya();
        if (this.quranPage > 2)
            window.scrollTo(this.width, this.height);
        else
            window.scrollTo(0, 0);
    };
    PagesComponent.prototype.goForth = function () {
        if (+this.quranPage + this.pageNum <= 604) {
            this.quranPage = +this.quranPage + this.pageNum;
            this.activeLayer = (this.activeLayer + 1) % 3;
            var nextLayer = (this.activeLayer + 1) % 3;
            this.loadPage(nextLayer, 1);
        }
        else {
            this.quranPage = 605 - this.pageNum;
            this.loadPage(2, 0);
            this.loadPage(1, -1);
            this.activeLayer = 2;
        }
        this.changeCurAya();
        window.scrollTo(0, 0);
    };
    PagesComponent.prototype.isUthmanic = function (f) {
        if (f === void 0) { f = this.fontFamily; }
        return f.indexOf('uthmanic') !== -1 || f === 'me-quran';
    };
    PagesComponent.prototype.resize = function (zoom) {
        var _this = this;
        if (zoom === void 0) { zoom = false; }
        var wDiff = this.defaultWidth - this.defaultTextWidth;
        var hDiff = this.defaultHeight - this.defaultTextHeight;
        var orientationChange = Math.abs(1 - this.width / window.innerHeight) < .2 && ((this.height < this.width && window.innerHeight > window.innerWidth) || (this.height > this.width && window.innerHeight < window.innerWidth));
        if (orientationChange)
            this.portrait = window.innerWidth > window.innerHeight;
        if ((!this.width || this.width != window.innerWidth - 10) && (!this.height || this.height != window.innerHeight) && (!this.width || this.pageNum > 1 || (window.innerWidth * (window.innerHeight - 50) > this.width * this.height) || orientationChange) || zoom) {
            this.height = window.innerHeight - 50;
            this.width = window.innerWidth - 10;
            var tempPageNum = this.pageNum;
            this.pageNum = Math.max(Math.floor(this.width / this.defaultTextWidth), Math.floor(this.height / this.defaultTextHeight));
            this.horizontal = Math.floor(this.width / this.defaultTextWidth) >= Math.floor(this.height / this.defaultTextHeight);
            if (!this.pageNum)
                this.pageNum = 1;
            if (this.pageNum !== tempPageNum)
                this.pageNumberChanged = true;
            if (this.horizontal) {
                this.pageWidth = this.width / this.pageNum;
                this.pageHeight = this.zoom * (this.mobile ? this.height * 2 : this.height);
            }
            else {
                this.pageHeight = this.zoom * ((this.mobile ? 2 : 1) * this.height / this.pageNum);
                this.pageWidth = this.pageNum > 1 ? Math.min(Math.round(this.pageHeight * .75), this.width) : this.width;
            }
            this.textWidth = this.pageWidth - wDiff - 10;
            this.textHeight = this.pageHeight - hDiff + Math.round(this.pageHeight / 40);
            this.pagesArray = [];
            for (var i = 0; i < this.pageNum; i++)
                this.pagesArray.push(i);
            if (this.timer)
                clearTimeout(this.timer);
            this.timer = setTimeout(function () {
                if (_this.pageNumberChanged) {
                    setTimeout(function () { return _this.loadAllPages(); }, 500);
                    _this.pageNumberChanged = false;
                }
                _this.layers.forEach(function (l) { return setTimeout(function () { return _this.quranService.contentChange(l); }, 0); });
            }, 100);
        }
    };
    PagesComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.mobile = Math.min(window.innerHeight, window.innerWidth) < 500;
        this.portrait = window.innerWidth > window.innerHeight;
        this.resize();
        this.quranService.getQuran()
            .subscribe(function (data) {
            _this.ayas = data;
            _this.loadPage(0, 0);
            _this.loadPage(1, 1);
        }, function (err) { return console.log("Error loding quran: ", err); });
        this.quranService.zoomChanged$
            .subscribe(function (zoom) {
            _this.zoom = Math.pow(1.25, zoom);
            _this.resize(true);
        });
        this.quranService.fontChanged$
            .subscribe(function (f) {
            do {
                var tempFont = fonts[f % fonts.length];
                f++;
            } while (tempFont === _this.fontFamily || (_this.naskhIncompatible && _this.isUthmanic(tempFont)));
            if (tempFont !== _this.fontFamily) {
                _this.fontFamily = tempFont;
                _this.layers.forEach(function (l) { return setTimeout(function () { return _this.quranService.contentChange(l); }, 0); });
            }
        });
        this.quranService.nightMode$
            .subscribe(function (m) {
            _this.nigthMode = m;
            if (m) {
                document.body.style.backgroundColor = '#000';
                document.body.style.color = '#fff';
            }
            else {
                document.body.style.backgroundColor = '#fff';
                document.body.style.color = '#000';
            }
        });
        this.quranService.page$
            .subscribe(function (p) {
            _this.quranPage = p;
            _this.loadAllPages();
        });
        var b = __webpack_require__(800);
        this.reverse = b.isFirefox || (b.isChrome);
        this.naskhIncompatible = b.isSafari || b.isiOS;
        if (!this.naskhIncompatible)
            this.fontFamily = 'quran-uthmanic';
    };
    PagesComponent.prototype.sajdaCheck = function (obj) {
        var ind = this.quranService.sajdaCheck(obj);
        var type;
        if (ind === -1)
            type = false;
        else if (ind < 11)
            type = 'recommended';
        else
            type = 'obligatory';
        return type;
    };
    PagesComponent.prototype.qhizbJuzCheck = function (obj) {
        var ind = this.quranService.qhizbCheck(obj);
        var type;
        if (ind === -1)
            type = false;
        switch (ind % 8) {
            case 0:
                type = 'juz';
                break;
            case 1:
            case 5:
                type = 'qhizb';
                break;
            case 2:
            case 6:
                type = 'hhizb';
                break;
            case 3:
            case 7:
                type = '3qhizb';
                break;
            case 4:
                type = 'hizb';
                break;
        }
        return type;
    };
    PagesComponent.prototype.pageHeightUpdate = function (h) {
        this.pageHeight = h;
    };
    PagesComponent.prototype.hizbJuzNumberCheck = function (obj) {
        var qhizbInd = this.quranService.qhizbCheck(obj);
        return { qhizbNum: qhizbInd };
    };
    return PagesComponent;
}());
PagesComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_12" /* Component */])({
        selector: 'app-pages',
        template: __webpack_require__(546),
        styles: [__webpack_require__(519)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__quran_service__["a" /* QuranService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__quran_service__["a" /* QuranService */]) === "function" && _a || Object])
], PagesComponent);

var _a;
//# sourceMappingURL=C:/Users/ali71/WebstormProjects/quran-together/src/pages.component.js.map

/***/ }),

/***/ 354:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(6);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return QhizbSajdaTooltipSignComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var QhizbSajdaTooltipSignComponent = (function () {
    function QhizbSajdaTooltipSignComponent() {
        this.qhizb_Hizb_juz_Number = 0;
        this.qhizbJuzSajdaSignOut = '';
        this.qhizbJuzSajdaMessage = '';
    }
    QhizbSajdaTooltipSignComponent.prototype.ngOnInit = function () {
        if (this.hizbNumber % 8 === 0)
            this.qhizb_Hizb_juz_Number = this.hizbNumber / 8 + 1;
        else if (this.hizbNumber % 4 === 0)
            this.qhizb_Hizb_juz_Number = this.hizbNumber / 4;
        else
            this.qhizb_Hizb_juz_Number = Math.floor(this.hizbNumber / 4) + 1;
        switch (this.tooltipMessage) {
            case 'obligatory':
                this.qhizbJuzSajdaMessage = "سجدة واجب";
                break;
            case 'recommended':
                this.qhizbJuzSajdaMessage = "سجدة مستحب";
                break;
            case 'juz':
                this.qhizbJuzSajdaMessage = "الجزء ";
                break;
            case 'hizb':
                this.qhizbJuzSajdaMessage = "الحزب ";
                break;
            case '3qhizb':
                this.qhizbJuzSajdaMessage = "ثلاثة أرباع الحزب ";
                break;
            case 'hhizb':
                this.qhizbJuzSajdaMessage = "نصف الحزب ";
                break;
            case 'qhizb':
                this.qhizbJuzSajdaMessage = "ربع الحزب ";
                break;
        }
        this.qhizbJuzSajdaSignOut = this.qhizbSajdaSign;
    };
    return QhizbSajdaTooltipSignComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["O" /* Input */])(),
    __metadata("design:type", Object)
], QhizbSajdaTooltipSignComponent.prototype, "qhizbSajdaSign", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["O" /* Input */])(),
    __metadata("design:type", Object)
], QhizbSajdaTooltipSignComponent.prototype, "tooltipMessage", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["O" /* Input */])(),
    __metadata("design:type", Object)
], QhizbSajdaTooltipSignComponent.prototype, "hizbNumber", void 0);
QhizbSajdaTooltipSignComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_12" /* Component */])({
        selector: 'app-qhizb-sajda-tooltip-sign',
        template: __webpack_require__(547),
        styles: [__webpack_require__(520)]
    }),
    __metadata("design:paramtypes", [])
], QhizbSajdaTooltipSignComponent);

//# sourceMappingURL=C:/Users/ali71/WebstormProjects/quran-together/src/qhizb-sajda-tooltip-sign.component.js.map

/***/ }),

/***/ 355:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(124);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__windowRef__ = __webpack_require__(72);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RouteComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var RouteComponent = (function () {
    function RouteComponent(route, winRef) {
        this.route = route;
        this.winRef = winRef;
        this.khatmLink = '';
    }
    RouteComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.subscribe(function (param) {
            _this.khatmLink = param['khlink'];
            _this.navigationHandler();
        }, function (err) { return console.log(err); });
    };
    RouteComponent.prototype.navigationHandler = function () {
        var _this = this;
        setTimeout(function () {
            _this.winRef.getWindow().location.href = 'https://play.google.com';
        }, 6000);
        this.winRef.getWindow().location.href = 'quranapp://khatm/' + this.khatmLink;
    };
    return RouteComponent;
}());
RouteComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_12" /* Component */])({
        selector: 'app-route',
        template: __webpack_require__(549),
        styles: [__webpack_require__(522)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* ActivatedRoute */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__windowRef__["a" /* WindowRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__windowRef__["a" /* WindowRef */]) === "function" && _b || Object])
], RouteComponent);

var _a, _b;
//# sourceMappingURL=C:/Users/ali71/WebstormProjects/quran-together/src/route.component.js.map

/***/ }),

/***/ 356:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__quran_service__ = __webpack_require__(26);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return StaticPageComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var StaticPageComponent = (function () {
    function StaticPageComponent(quranService) {
        this.quranService = quranService;
        this.mobile = false;
        this.portrait = false;
        this.back = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["F" /* EventEmitter */]();
        this.forth = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["F" /* EventEmitter */]();
        this.pageHeightUpdate = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["F" /* EventEmitter */]();
        this.loading = false;
        this.explained = false;
        this.nightMode = false;
    }
    StaticPageComponent.prototype.goBack = function () {
        this.back.emit(true);
    };
    StaticPageComponent.prototype.goForth = function () {
        this.forth.emit(true);
    };
    StaticPageComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.nightMode = this.quranService.nightMode;
        _a = this.quranService.fontParams(this.fontFamily), this.fontScale = _a[0], this.fontLineHeight = _a[1], this.fontHeightAdjust = _a[2];
        this.styleChage();
        this.quranService.contentChanged$
            .subscribe(function (layer) {
            if (+layer === +_this.layer) {
                _a = _this.quranService.fontParams(_this.fontFamily), _this.fontScale = _a[0], _this.fontLineHeight = _a[1], _this.fontHeightAdjust = _a[2];
                _this.contentChange();
            }
            var _a;
        });
        this.quranService.nightMode$
            .subscribe(function (m) {
            _this.nightMode = m;
        });
        var _a;
    };
    StaticPageComponent.prototype.styleChage = function () {
        this.startTime = Date.now();
        var style = this.border.nativeElement.style;
        style.width = this.pageWidth + 'px';
        if (!this.mobile)
            style.height = this.pageHeight + 'px';
        style.right = this.pageNum * this.pageWidth + 'px';
        style.top = '50px';
    };
    StaticPageComponent.prototype.contentChange = function () {
        var _this = this;
        this.styleChage();
        var element = this.page.nativeElement;
        var style = element.style;
        var textHeight = this.textHeight * .9934 - 80;
        if (this.fontHeightAdjust)
            textHeight -= 10;
        var fontSize = Math.round(38 * this.pageHeight * this.pageWidth * this.fontScale * (this.mobile ? 1.5 : 1) / 531e3);
        var lineHeight = this.fontLineHeight + '%';
        style.fontSize = fontSize + 'px';
        style.lineHeight = lineHeight;
        var fontSizes = [];
        var bestDiff;
        var bestFontSize;
        var changeFontSize = function () {
            if (_this.mobile) {
                style.margin = _this.portrait ? '-20px' : '-40px';
                setTimeout(function () {
                    var wantedHeight = element.scrollHeight + (_this.portrait ? 100 : 80);
                    var borderStyle = _this.border.nativeElement.style;
                    borderStyle.height = wantedHeight + 'px';
                    _this.pageHeight = wantedHeight + 'px';
                    _this.tapperLeft.nativeElement.style.height = wantedHeight + 'px';
                    _this.tapperRight.nativeElement.style.height = wantedHeight + 'px';
                    _this.show(style);
                }, 0);
            }
            else {
                var diff = Math.abs(element.scrollHeight - textHeight);
                if (diff > textHeight * .0666) {
                    if (fontSizes.length < 50 && fontSizes.filter(function (el) { return el === style.fontSize; }).length < 2) {
                        if (!bestDiff || diff < bestDiff) {
                            bestDiff = diff;
                            bestFontSize = style.fontSize;
                        }
                        var increment = Math.ceil(parseInt(style.fontSize) / 40);
                        if (element.scrollHeight > textHeight)
                            increment *= -1;
                        style.fontSize = increment + parseInt(style.fontSize) + 'px';
                        fontSizes.push(style.fontSize);
                        setTimeout(changeFontSize, 0);
                    }
                    else {
                        if (bestFontSize)
                            style.fontSize = bestFontSize;
                        setTimeout(changeLineSpacing, 0);
                    }
                }
                else {
                    setTimeout(changeLineSpacing, 0);
                }
            }
        };
        var lineHeights = [];
        var bestLineHeight;
        var changeLineSpacing = function () {
            var diff = element.scrollHeight - textHeight;
            if (diff > 0 || (diff < 0 && -diff > 20)) {
                if (diff < 0 && -diff < bestDiff) {
                    bestDiff = -diff;
                    bestLineHeight = parseInt(style.lineHeight);
                }
                var newLineHeight_1 = (element.scrollHeight > textHeight ? -1 : 1) + parseInt(style.lineHeight);
                if (lineHeights.length < 50 && lineHeights.filter(function (el) { return el === newLineHeight_1; }).length < 2) {
                    style.lineHeight = newLineHeight_1 + '%';
                    lineHeights.push(newLineHeight_1);
                    setTimeout(changeLineSpacing, 0);
                }
                else {
                    if (bestLineHeight)
                        style.lineHeight = bestLineHeight + '%';
                    _this.show(style);
                }
            }
            else
                _this.show(style);
        };
        this.hide(style);
        setTimeout(changeFontSize, 0);
    };
    StaticPageComponent.prototype.hide = function (style) {
        style.visibility = 'hidden';
        this.loading = true;
    };
    StaticPageComponent.prototype.show = function (style) {
        var _this = this;
        setTimeout(function () {
            style.visibility = null;
            _this.explained = true;
            _this.loading = false;
        }, this.explained ? 0 : 2000 - (Date.now() - this.startTime));
    };
    return StaticPageComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_14" /* ViewChild */])('page'),
    __metadata("design:type", Object)
], StaticPageComponent.prototype, "page", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_14" /* ViewChild */])('border'),
    __metadata("design:type", Object)
], StaticPageComponent.prototype, "border", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_14" /* ViewChild */])('tapperRight'),
    __metadata("design:type", Object)
], StaticPageComponent.prototype, "tapperRight", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_14" /* ViewChild */])('tapperLeft'),
    __metadata("design:type", Object)
], StaticPageComponent.prototype, "tapperLeft", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["O" /* Input */])(),
    __metadata("design:type", Object)
], StaticPageComponent.prototype, "pageHeight", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["O" /* Input */])(),
    __metadata("design:type", Object)
], StaticPageComponent.prototype, "pageWidth", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["O" /* Input */])(),
    __metadata("design:type", Object)
], StaticPageComponent.prototype, "textHeight", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["O" /* Input */])(),
    __metadata("design:type", Object)
], StaticPageComponent.prototype, "pageNum", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["O" /* Input */])(),
    __metadata("design:type", Object)
], StaticPageComponent.prototype, "endPage", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["O" /* Input */])(),
    __metadata("design:type", Object)
], StaticPageComponent.prototype, "layer", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["O" /* Input */])(),
    __metadata("design:type", Object)
], StaticPageComponent.prototype, "fontFamily", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["O" /* Input */])(),
    __metadata("design:type", Object)
], StaticPageComponent.prototype, "halfPage", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["O" /* Input */])(),
    __metadata("design:type", Object)
], StaticPageComponent.prototype, "fontScale", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["O" /* Input */])(),
    __metadata("design:type", Object)
], StaticPageComponent.prototype, "fontLineHeight", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["O" /* Input */])(),
    __metadata("design:type", Object)
], StaticPageComponent.prototype, "fontHeightAdjust", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["O" /* Input */])(),
    __metadata("design:type", Object)
], StaticPageComponent.prototype, "mobile", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["O" /* Input */])(),
    __metadata("design:type", Object)
], StaticPageComponent.prototype, "portrait", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_5" /* Output */])(),
    __metadata("design:type", Object)
], StaticPageComponent.prototype, "back", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_5" /* Output */])(),
    __metadata("design:type", Object)
], StaticPageComponent.prototype, "forth", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_5" /* Output */])(),
    __metadata("design:type", Object)
], StaticPageComponent.prototype, "pageHeightUpdate", void 0);
StaticPageComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_12" /* Component */])({
        selector: 'app-static-page',
        template: __webpack_require__(550),
        styles: [__webpack_require__(523)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__quran_service__["a" /* QuranService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__quran_service__["a" /* QuranService */]) === "function" && _a || Object])
], StaticPageComponent);

var _a;
//# sourceMappingURL=C:/Users/ali71/WebstormProjects/quran-together/src/static-page.component.js.map

/***/ }),

/***/ 357:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__quran_service__ = __webpack_require__(26);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return StylingService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var StylingService = (function () {
    function StylingService(quranService) {
        this.quranService = quranService;
        this.quranService.nightMode$.subscribe(function (data) {
            if (data) {
            }
            else {
            }
        });
    }
    StylingService.prototype.getStyle = function () {
    };
    return StylingService;
}());
StylingService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Injectable */])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__quran_service__["a" /* QuranService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__quran_service__["a" /* QuranService */]) === "function" && _a || Object])
], StylingService);

var _a;
//# sourceMappingURL=C:/Users/ali71/WebstormProjects/quran-together/src/styling.service.js.map

/***/ }),

/***/ 358:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__quran_service__ = __webpack_require__(26);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SuraBismillahInfoTableComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var SuraBismillahInfoTableComponent = (function () {
    function SuraBismillahInfoTableComponent(quranService) {
        this.quranService = quranService;
        this.bismillahText = '';
        this.suraname = '';
        this.suraAyaNumber = 0;
        this.nightMode = false;
    }
    SuraBismillahInfoTableComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.nightMode = this.quranService.nightMode;
        this.suraAyaNumber = this.quranService.suraAyaNumberCheck(this.suraname, false).a;
        this.suraTanzilLocation = this.quranService.suraAyaNumberCheck(this.suraname, true).b;
        this.imgflag = (this.suraTanzilLocation > "Meccan" ? false : true);
        this.suraTanzilLocation = (this.suraTanzilLocation > "Meccan" ? 'مدنی' : 'مکی');
        this.suraArabicName = this.quranService.suraAyaNumberCheck(this.suraname, true).c;
        this.quranService.nightMode$
            .subscribe(function (m) {
            _this.nightMode = m;
        });
    };
    return SuraBismillahInfoTableComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["O" /* Input */])(),
    __metadata("design:type", Object)
], SuraBismillahInfoTableComponent.prototype, "bismillahText", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["O" /* Input */])(),
    __metadata("design:type", Object)
], SuraBismillahInfoTableComponent.prototype, "suraname", void 0);
SuraBismillahInfoTableComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_12" /* Component */])({
        selector: 'app-sura-bismillah-info-table',
        template: __webpack_require__(551),
        styles: [__webpack_require__(524)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__quran_service__["a" /* QuranService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__quran_service__["a" /* QuranService */]) === "function" && _a || Object])
], SuraBismillahInfoTableComponent);

var _a;
//# sourceMappingURL=C:/Users/ali71/WebstormProjects/quran-together/src/sura-bismillah-info-table.component.js.map

/***/ }),

/***/ 359:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.
// The file contents for the current environment will overwrite these during build.
var environment = {
    production: false
};
//# sourceMappingURL=C:/Users/ali71/WebstormProjects/quran-together/src/environment.js.map

/***/ }),

/***/ 360:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_core_js_es6_symbol__ = __webpack_require__(374);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_core_js_es6_symbol___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_core_js_es6_symbol__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_core_js_es6_object__ = __webpack_require__(367);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_core_js_es6_object___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_core_js_es6_object__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_core_js_es6_function__ = __webpack_require__(363);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_core_js_es6_function___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_core_js_es6_function__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_core_js_es6_parse_int__ = __webpack_require__(369);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_core_js_es6_parse_int___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_core_js_es6_parse_int__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_core_js_es6_parse_float__ = __webpack_require__(368);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_core_js_es6_parse_float___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_core_js_es6_parse_float__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_core_js_es6_number__ = __webpack_require__(366);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_core_js_es6_number___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_core_js_es6_number__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_core_js_es6_math__ = __webpack_require__(365);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_core_js_es6_math___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_core_js_es6_math__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_core_js_es6_string__ = __webpack_require__(373);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_core_js_es6_string___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_core_js_es6_string__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_core_js_es6_date__ = __webpack_require__(362);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_core_js_es6_date___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_core_js_es6_date__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_core_js_es6_array__ = __webpack_require__(361);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_core_js_es6_array___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_core_js_es6_array__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_core_js_es6_regexp__ = __webpack_require__(371);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_core_js_es6_regexp___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10_core_js_es6_regexp__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_core_js_es6_map__ = __webpack_require__(364);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_core_js_es6_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_11_core_js_es6_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_core_js_es6_set__ = __webpack_require__(372);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_core_js_es6_set___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_12_core_js_es6_set__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_core_js_es6_reflect__ = __webpack_require__(370);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_core_js_es6_reflect___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_13_core_js_es6_reflect__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14_core_js_es7_reflect__ = __webpack_require__(375);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14_core_js_es7_reflect___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_14_core_js_es7_reflect__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15_zone_js_dist_zone__ = __webpack_require__(808);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15_zone_js_dist_zone___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_15_zone_js_dist_zone__);
// This file includes polyfills needed by Angular 2 and is loaded before
// the app. You can add your own extra polyfills to this file.
















//# sourceMappingURL=C:/Users/ali71/WebstormProjects/quran-together/src/polyfills.js.map

/***/ }),

/***/ 512:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(20)(false);
// imports


// module
exports.push([module.i, ".quran-night-mode{\r\n  background-color: black;\r\n  color: white !important;\r\n}\r\n.quran-day-mode{\r\n  background-color: #faf6f3;\r\n  color: black;\r\n}\r\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 513:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(20)(false);
// imports


// module
exports.push([module.i, ".outer{\r\n  position: relative;\r\n  background-color: rgba(255,255,255,0);\r\n  display:inline-block;\r\n\r\n}\r\ndiv.quran{\r\n  font-size:125%;\r\n}\r\ndiv.quran-uthmanic{\r\n  font-size: 125%;\r\n  margin-top:-30%;\r\n}\r\ndiv.quran-uthmanic-bold{\r\n  font-size: 105%\r\n}\r\ndiv.qalam{\r\n  font-size: 175%;\r\n  margin-top: -30%\r\n}\r\ndiv.me-quran{\r\n  font-size: 75%;\r\n  margin:-30% 10px;\r\n}\r\n.inner{\r\n  position: absolute;\r\n  left:0;\r\n  width:100%;\r\n  height: 100%;\r\n  background-color: rgba(255,255,255,0);\r\n}\r\nspan.quran{\r\n  top:-3%;\r\n}\r\nspan.quran-uthmanic{\r\n}\r\nspan.quran-uthmanic-bold{\r\n  top: 2%;\r\n}\r\nspan.qalam{\r\n  top: 12%;\r\n}\r\nspan.me-quran{\r\n\r\n}\r\n.wrapper\r\n{\r\n  text-align: center;\r\n  font-size:40%;\r\n  display: table;\r\n  width:100%;\r\n  height: 100%;\r\n  background-color: rgba(255,255,255,0);\r\n}\r\n.entry\r\n{\r\n  display:table-cell;\r\n  vertical-align: middle;\r\n  width:100%;\r\n  height: 100%;\r\n}\r\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 514:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(20)(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 515:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(20)(false);
// imports


// module
exports.push([module.i, ".rowSpace{\r\n  margin: 10px;\r\n}\r\n\r\n.title{\r\n  font-weight: bold;\r\n}\r\n\r\n.content{\r\n  font-weight: normal;\r\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 516:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(20)(false);
// imports


// module
exports.push([module.i, ".icon{\r\n  padding:2px 5px;\r\n  border-radius: 20%;\r\n  display: inline;\r\n  color: #76c09f !important;\r\n}\r\ni{\r\n  font-size: 135%;\r\n}\r\n.icon:active{\r\n  color:grey !important;\r\n}\r\n.icon:hover{\r\n  background-color: black;\r\n}\r\n.disabled{\r\n  border-style: ridge !important;\r\n  border-width: 2px !important;\r\n  border-color: darkgray !important;\r\n  background-color: rgba(64,64,64,.7)  !important;\r\n  display: unset !important;\r\n}\r\n.selectInit{\r\n  width:40%;\r\n  color: black;\r\n  margin-left: 8px;\r\n  font-size:80%;\r\n}\r\n.audioInit{\r\n  margin-top: 3px;\r\n  width: 90%;\r\n  height: 30px;\r\n}\r\n.pageInputInit{\r\n   width: 30%;\r\n   height: 35px;\r\n   color: black;\r\n   margin-right: 2px;\r\n }\r\n.audiosUlInit{\r\n  text-align:left;\r\n  border:1px solid white;\r\n  padding:3px;margin:3px;\r\n  border-radius: 5px;\r\n  font-size: smaller\r\n}\r\n\r\n.navZoom {\r\n  text-decoration: none;\r\n  background-color: transparent;\r\n  cursor: pointer;\r\n}\r\n\r\n.navZoom:disabled {\r\n  text-decoration: none;\r\n  background-color: transparent;\r\n  cursor: pointer;\r\n}\r\n\r\n.navBtn{\r\n  background-color: transparent;\r\n  cursor: pointer;\r\n  border: none;\r\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 517:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(20)(false);
// imports


// module
exports.push([module.i, "\r\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 518:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(20)(false);
// imports


// module
exports.push([module.i, ".info-table{\r\n  width: 100%;\r\n  height: 100%;\r\n  border: none;\r\n  font-size: 150%;\r\n}\r\n.info-row{\r\n  width: 100%;\r\n  height: 100%;\r\n  border: none;\r\n}\r\n\r\n.info-column1{\r\n  width: 40%;\r\n  font-family: \"Arabic Typesetting\";\r\n  text-align: left;\r\n  border: none;\r\n  padding-bottom:10px;\r\n}\r\n\r\n.info-column2{\r\n  height: 100%;\r\n  width: 20%;\r\n  font-family: \"Arabic Typesetting\";\r\n  border: none;\r\n}\r\n\r\n.day-pic-address{\r\n  background-image: url(" + __webpack_require__(532) + ");\r\n}\r\n\r\n.night-pic-address{\r\n  background-image: url(" + __webpack_require__(531) + ");\r\n}\r\n\r\n.pic{\r\n  background-repeat: no-repeat;\r\n  background-position: top;\r\n  background-size: contain;\r\n  padding-top: 3px;\r\n}\r\n.center-text{\r\n  display: inline-block;\r\n  width: 100%;\r\n  margin-top: -4px;\r\n  text-align: center;\r\n}\r\n.pagenum{\r\n  margin-right: 1px;\r\n  font-weight: bold;\r\n  font-size: x-large;\r\n  vertical-align: top;\r\n  padding:15px 4px;\r\n}\r\n\r\n.info-column3{\r\n  width: 40%;\r\n  font-family: \"Arabic Typesetting\";\r\n  text-align: right;\r\n  border: none;\r\n  padding-bottom:10px;\r\n}\r\n\r\n\r\n.right-left-text{\r\n  font-weight: bolder;\r\n  vertical-align: bottom;\r\n}\r\n\r\n\r\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 519:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(20)(false);
// imports


// module
exports.push([module.i, "span{\r\n  padding:0px;\r\n  margin:0px;\r\n  border:0;\r\n  display: inline;\r\n}\r\n.bismillah{\r\n  width:100% !important;\r\n}\r\n.quran{\r\n  font-family: quran;\r\n  text-align: justify;\r\n  direction: rtl;\r\n}\r\n\r\n.pageInfo{\r\n  position: absolute;\r\n  height: 48px;\r\n  width: 100%;\r\n  top:0px;\r\n  padding-top: -2px;\r\n  padding-right: 1px;\r\n  padding-left: 1px;\r\n  margin-left: 1px;\r\n  margin-right: 1px;\r\n  direction: rtl;\r\n  border: none;\r\n}\r\n\r\n.outer-table {\r\n  height: 100%;\r\n  width: 100%;\r\n  border: none;\r\n}\r\n.outer-row {\r\n  height: 100%;\r\n  width: 100%;\r\n  border: none;\r\n}\r\n\r\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 520:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(20)(false);
// imports


// module
exports.push([module.i, ".tooltipQhizbSajda {\r\n  position: relative;\r\n  display: inline-block;\r\n  z-index: 200;\r\n}\r\n\r\n/* Tooltip text */\r\n.tooltipQhizbSajda .tooltiptextQhizbSajda {\r\n  font-family: quran;\r\n  visibility: hidden;\r\n  width:120px;\r\n  font-weight: bold;\r\n  font-size:large;\r\n  background-color: rgba(80,80,80,0.8);\r\n  color: #fff;\r\n  text-align: center;\r\n  padding: 5px 0;\r\n  border-radius: 6px;\r\n\r\n\r\n  /* Position the tooltip text - see examples below! */\r\n  position: absolute;\r\n  z-index: 1;\r\n  bottom: 100%;\r\n  left: 50%;\r\n  margin-left: -50px; /* Use half of the width (120/2 = 60), to center the tooltip */\r\n}\r\n\r\n/* Show the tooltip text when you mouse over the tooltip container */\r\n.tooltipQhizbSajda:hover .tooltiptextQhizbSajda {\r\n  visibility: visible;\r\n}\r\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 521:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(20)(false);
// imports


// module
exports.push([module.i, ".night_light_background{\r\n  background-color: rgba(0, 0, 0, 0.62);\r\n}\r\n\r\n.normal_light_background{\r\n  background-color: rgba(250, 226, 191, 0.38);\r\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 522:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(20)(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 523:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(20)(false);
// imports


// module
exports.push([module.i, "div.border-day{\r\n  width: 650px;\r\n  height: 866px;\r\n  -o-border-image: url(" + __webpack_require__(168) + ") repeat;\r\n     border-image: url(" + __webpack_require__(168) + ") repeat;\r\n  border-width: 80px;\r\n  border-style: solid;\r\n  border-image-slice: 100;\r\n  padding: 0px;\r\n  display:inline-block;\r\n  position:absolute;\r\n  margin:5px;\r\n}\r\ndiv.border-night{\r\n  width: 650px;\r\n  height: 866px;\r\n  -o-border-image: url(" + __webpack_require__(167) + ") repeat;\r\n     border-image: url(" + __webpack_require__(167) + ") repeat;\r\n  border-width: 80px;\r\n  border-style: solid;\r\n  border-image-slice: 100;\r\n  padding: 0px;\r\n  display:inline-block;\r\n  position:absolute;\r\n  margin:5px;\r\n}\r\n\r\n\r\n\r\ndiv.internal{\r\n  height: 1px !important;\r\n  letter-spacing: 0px;\r\n  line-height: 130%;\r\n  font-size:35px;\r\n}\r\n\r\ndiv.tapper {\r\n  position:absolute;\r\n  top: 50px;\r\n  z-index:100;\r\n}\r\n\r\ndiv.clear{\r\n  backgroud-color:transparent;\r\n  color:transparent;\r\n}\r\n\r\ndiv.explain{\r\n  background-color: rgba(32, 32, 32, 0.2);\r\n  color: white;\r\n  padding: 150px 30px 150px 30px;\r\n  font-size: 20px;\r\n}\r\n\r\n\r\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 524:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(20)(false);
// imports


// module
exports.push([module.i, ".bismillahtable{\r\n  direction:rtl;\r\n  width: 100%;\r\n  height: 100%;\r\n  margin: 0px;\r\n  margin-bottom: -20px;\r\n}\r\n\r\n.bismillahrow{\r\n  width: 100%;\r\n  height: 100%;\r\n}\r\n\r\n.day-pic-address-col-1-3{\r\n  background-image: url(" + __webpack_require__(526) + ");\r\n}\r\n\r\n.night-pic-address-col-1-3{\r\n  background-image: url(" + __webpack_require__(525) + ");\r\n}\r\n\r\n\r\n.bismillahcol-1-3{\r\n  width:15%;\r\n  height: 100%;\r\n  background-repeat: no-repeat;\r\n  background-position: center;\r\n  background-size: 85% 70%;\r\n}\r\n\r\n.fontinit{\r\n  font-family: quran;\r\n  font-size: large;\r\n  font-weight: bold;\r\n  text-align: center;\r\n}\r\n\r\n.day-pic-address-col2{\r\n  background-image: url(" + __webpack_require__(534) + ");\r\n}\r\n.night-pic-address-col2{\r\n  background-image: url(" + __webpack_require__(533) + ");\r\n}\r\n.topayat{\r\n  line-height:100%;\r\n  padding:40px 0px 0px 0px;\r\n}\r\n.downayat{\r\n  line-height:100%;\r\n  padding:0px 0px 40px 0px;\r\n}\r\n.toptanzil{\r\n  line-height:100%;\r\n}\r\n.downtanzil{\r\n  line-height:100%;\r\n}\r\n.bismillahcol2{\r\n  width:70%;\r\n  height: 100%;\r\n  text-align:center;\r\n  font-family: quran;\r\n  font-size: 80%;\r\n  font-weight: bold;\r\n  background-repeat: no-repeat;\r\n  background-position: center;\r\n  background-size: 100% 75%;\r\n}\r\n\r\n.pic-makki-day{\r\n  background-image: url(" + __webpack_require__(530) + ");\r\n  background-repeat: no-repeat;\r\n  background-position: bottom;\r\n  background-size: 35% 35%;\r\n  padding-top:10px;\r\n}\r\n.pic-makki-night{\r\n  background-image: url(" + __webpack_require__(529) + ");\r\n  background-repeat: no-repeat;\r\n  background-position: bottom;\r\n  background-size: 35% 35%;\r\n  padding-top:10px;\r\n}\r\n\r\n\r\n.pic-madani-day{\r\n  background-image: url(" + __webpack_require__(527) + ");\r\n  background-repeat: no-repeat;\r\n  background-position: bottom;\r\n  background-size: 35% 35%;\r\n  padding-top:10px;\r\n}\r\n\r\n.pic-madani-night{\r\n  background-image: url(" + __webpack_require__(528) + ");\r\n  background-repeat: no-repeat;\r\n  background-position: bottom;\r\n  background-size: 35% 35%;\r\n  padding-top:10px;\r\n}\r\n\r\n.bismillah{\r\n  width:100% !important;\r\n  font-size: 85%;\r\n  text-align:center;\r\n}\r\n\r\n\r\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 525:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "AyatBoxNight.12ad55d9eb60f732b011.svg";

/***/ }),

/***/ 526:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "AyatBoxNormal.ca15f31406a7b91501c4.svg";

/***/ }),

/***/ 527:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "MadaniFillGreenNormal.d6017fb3d2b40abbb378.svg";

/***/ }),

/***/ 528:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "MadaniFillNight.229912926bf694f8a065.svg";

/***/ }),

/***/ 529:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "MakkiFillNight.1bd8cfc2002e14c6b3fc.svg";

/***/ }),

/***/ 530:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "MakkiFillNormal.acc8935f063510d19cfd.svg";

/***/ }),

/***/ 531:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "PageNumberBoxNight.a97081a57e86283b6ecc.svg";

/***/ }),

/***/ 532:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "PageNumberBoxNormal.a97081a57e86283b6ecc.svg";

/***/ }),

/***/ 533:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "SuraNameBoxNight.6325c833ebf8a5e9b454.svg";

/***/ }),

/***/ 534:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "SuraNameBoxNormal.82b6f24f7cd89d6912e2.svg";

/***/ }),

/***/ 538:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./af": 170,
	"./af.js": 170,
	"./ar": 177,
	"./ar-dz": 171,
	"./ar-dz.js": 171,
	"./ar-kw": 172,
	"./ar-kw.js": 172,
	"./ar-ly": 173,
	"./ar-ly.js": 173,
	"./ar-ma": 174,
	"./ar-ma.js": 174,
	"./ar-sa": 175,
	"./ar-sa.js": 175,
	"./ar-tn": 176,
	"./ar-tn.js": 176,
	"./ar.js": 177,
	"./az": 178,
	"./az.js": 178,
	"./be": 179,
	"./be.js": 179,
	"./bg": 180,
	"./bg.js": 180,
	"./bn": 181,
	"./bn.js": 181,
	"./bo": 182,
	"./bo.js": 182,
	"./br": 183,
	"./br.js": 183,
	"./bs": 184,
	"./bs.js": 184,
	"./ca": 185,
	"./ca.js": 185,
	"./cs": 186,
	"./cs.js": 186,
	"./cv": 187,
	"./cv.js": 187,
	"./cy": 188,
	"./cy.js": 188,
	"./da": 189,
	"./da.js": 189,
	"./de": 192,
	"./de-at": 190,
	"./de-at.js": 190,
	"./de-ch": 191,
	"./de-ch.js": 191,
	"./de.js": 192,
	"./dv": 193,
	"./dv.js": 193,
	"./el": 194,
	"./el.js": 194,
	"./en-au": 195,
	"./en-au.js": 195,
	"./en-ca": 196,
	"./en-ca.js": 196,
	"./en-gb": 197,
	"./en-gb.js": 197,
	"./en-ie": 198,
	"./en-ie.js": 198,
	"./en-nz": 199,
	"./en-nz.js": 199,
	"./eo": 200,
	"./eo.js": 200,
	"./es": 202,
	"./es-do": 201,
	"./es-do.js": 201,
	"./es.js": 202,
	"./et": 203,
	"./et.js": 203,
	"./eu": 204,
	"./eu.js": 204,
	"./fa": 205,
	"./fa.js": 205,
	"./fi": 206,
	"./fi.js": 206,
	"./fo": 207,
	"./fo.js": 207,
	"./fr": 210,
	"./fr-ca": 208,
	"./fr-ca.js": 208,
	"./fr-ch": 209,
	"./fr-ch.js": 209,
	"./fr.js": 210,
	"./fy": 211,
	"./fy.js": 211,
	"./gd": 212,
	"./gd.js": 212,
	"./gl": 213,
	"./gl.js": 213,
	"./gom-latn": 214,
	"./gom-latn.js": 214,
	"./he": 215,
	"./he.js": 215,
	"./hi": 216,
	"./hi.js": 216,
	"./hr": 217,
	"./hr.js": 217,
	"./hu": 218,
	"./hu.js": 218,
	"./hy-am": 219,
	"./hy-am.js": 219,
	"./id": 220,
	"./id.js": 220,
	"./is": 221,
	"./is.js": 221,
	"./it": 222,
	"./it.js": 222,
	"./ja": 223,
	"./ja.js": 223,
	"./jv": 224,
	"./jv.js": 224,
	"./ka": 225,
	"./ka.js": 225,
	"./kk": 226,
	"./kk.js": 226,
	"./km": 227,
	"./km.js": 227,
	"./kn": 228,
	"./kn.js": 228,
	"./ko": 229,
	"./ko.js": 229,
	"./ky": 230,
	"./ky.js": 230,
	"./lb": 231,
	"./lb.js": 231,
	"./lo": 232,
	"./lo.js": 232,
	"./lt": 233,
	"./lt.js": 233,
	"./lv": 234,
	"./lv.js": 234,
	"./me": 235,
	"./me.js": 235,
	"./mi": 236,
	"./mi.js": 236,
	"./mk": 237,
	"./mk.js": 237,
	"./ml": 238,
	"./ml.js": 238,
	"./mr": 239,
	"./mr.js": 239,
	"./ms": 241,
	"./ms-my": 240,
	"./ms-my.js": 240,
	"./ms.js": 241,
	"./my": 242,
	"./my.js": 242,
	"./nb": 243,
	"./nb.js": 243,
	"./ne": 244,
	"./ne.js": 244,
	"./nl": 246,
	"./nl-be": 245,
	"./nl-be.js": 245,
	"./nl.js": 246,
	"./nn": 247,
	"./nn.js": 247,
	"./pa-in": 248,
	"./pa-in.js": 248,
	"./pl": 249,
	"./pl.js": 249,
	"./pt": 251,
	"./pt-br": 250,
	"./pt-br.js": 250,
	"./pt.js": 251,
	"./ro": 252,
	"./ro.js": 252,
	"./ru": 253,
	"./ru.js": 253,
	"./sd": 254,
	"./sd.js": 254,
	"./se": 255,
	"./se.js": 255,
	"./si": 256,
	"./si.js": 256,
	"./sk": 257,
	"./sk.js": 257,
	"./sl": 258,
	"./sl.js": 258,
	"./sq": 259,
	"./sq.js": 259,
	"./sr": 261,
	"./sr-cyrl": 260,
	"./sr-cyrl.js": 260,
	"./sr.js": 261,
	"./ss": 262,
	"./ss.js": 262,
	"./sv": 263,
	"./sv.js": 263,
	"./sw": 264,
	"./sw.js": 264,
	"./ta": 265,
	"./ta.js": 265,
	"./te": 266,
	"./te.js": 266,
	"./tet": 267,
	"./tet.js": 267,
	"./th": 268,
	"./th.js": 268,
	"./tl-ph": 269,
	"./tl-ph.js": 269,
	"./tlh": 270,
	"./tlh.js": 270,
	"./tr": 271,
	"./tr.js": 271,
	"./tzl": 272,
	"./tzl.js": 272,
	"./tzm": 274,
	"./tzm-latn": 273,
	"./tzm-latn.js": 273,
	"./tzm.js": 274,
	"./uk": 275,
	"./uk.js": 275,
	"./ur": 276,
	"./ur.js": 276,
	"./uz": 278,
	"./uz-latn": 277,
	"./uz-latn.js": 277,
	"./uz.js": 278,
	"./vi": 279,
	"./vi.js": 279,
	"./x-pseudo": 280,
	"./x-pseudo.js": 280,
	"./yo": 281,
	"./yo.js": 281,
	"./zh-cn": 282,
	"./zh-cn.js": 282,
	"./zh-hk": 283,
	"./zh-hk.js": 283,
	"./zh-tw": 284,
	"./zh-tw.js": 284
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 538;


/***/ }),

/***/ 539:
/***/ (function(module, exports) {

module.exports = "<div *ngIf=\"showLink\" style=\"width:100%;background:palegreen;color:black; min-height: 15px;\">\r\n  <i class=\"fa fa-close\" style=\"padding:5px\" (click)=\"openLink()\"></i>\r\n  You can download our application for mobile on\r\n  <a href=\"storeAddress\" (click)=\"openLink()\">{{storeAddress}}</a>\r\n</div>\r\n<md-sidenav-container [style.height]=\"height\" [style.background-color]=\"backgroundColor\" [style.color]=\"color\">\r\n  <md-sidenav #sidenav align=\"end\" style=\"width: 300px !important;\">\r\n    <app-nav (closeNav)=\"sidenav.close()\"></app-nav>\r\n  </md-sidenav>\r\n  <a id=\"menu-toggle\"\r\n     class=\"btn btn-lg toggle\"\r\n     [class.btn-dark-night-mode]=\"nightModeVar\" [class.btn-dark-day-mode]=\"!nightModeVar\"\r\n     (click)=\"sidenav.open()\">\r\n    <i class=\"fa fa-bars\"></i>\r\n  </a>\r\n  <router-outlet></router-outlet>\r\n</md-sidenav-container>\r\n"

/***/ }),

/***/ 540:
/***/ (function(module, exports) {

module.exports = "<div [ngClass]=\"['outer', fontFamily]\"><span *ngIf=\"!needntBorder\">&#x06DD;</span><app-number-translator *ngIf=\"needntBorder\" [reverse]=\"reverse&&fontFamily==='quran-uthmanic'\" [inputNumber]=\"ayanumber\"></app-number-translator>\r\n  <span *ngIf=\"!needntBorder\" [ngClass]=\"['inner', fontFamily]\">\r\n      <div class=\"wrapper\">\r\n          <div class=\"entry\"><app-number-translator [inputNumber]=\"ayanumber\" [reverse]=\"false\" [farsiNums]=\"farsiNums\"></app-number-translator></div>\r\n      </div>\r\n  </span>\r\n</div>\r\n"

/***/ }),

/***/ 541:
/***/ (function(module, exports) {

module.exports = "<div *ngIf=\"!isSelect\">\n  <md-grid-list cols=\"6\" rowHeight=\"50px\">\n    <md-grid-tile *ngFor=\"let p of allCommitments\">\n      <button md-raised-button\n              *ngIf=\"p.isread\"\n              [style.background-color]=\"quranService.nightMode ? '#7b87ad' : '#c5bfb1' \"\n              (click)=\"commit(p)\" (press)=\"selectRange(p)\">{{p.page_number}}</button>\n      <button md-raised-button\n              *ngIf=\"!p.isread\"\n              [style.background-color]=\"quranService.nightMode ? '#95506f' : '#7ec5a5' \"\n              (click)=\"commit(p)\" (press)=\"selectRange(p)\">{{p.page_number}}</button>\n    </md-grid-tile>\n  </md-grid-list>\n</div>\n<div *ngIf=\"isSelect\">\n\n</div>\n"

/***/ }),

/***/ 542:
/***/ (function(module, exports) {

module.exports = "<md-card>\n  <md-card-content>\n    <div *ngIf=\"!isSubmitted && isNew\">\n      <div class=\"rowSpace\">\n        <md-input-container>\n          <input mdInput type=\"text\" placeholder=\"Khatm's title\" [(ngModel)]=\"name\" (ngModelChange)=\"checkDisability()\">\n        </md-input-container>\n      </div>\n      <div class=\"rowSpace\">\n        <label>Description</label>\n        <br/>\n        <textarea [(ngModel)]=\"description\" cols=\"30\"></textarea>\n      </div>\n      <div class=\"rowSpace\">\n        <md-checkbox [(ngModel)]=\"ownerShown\">Show owner's details to others</md-checkbox>\n      </div>\n      <div class=\"rowSpace\">\n        <md-radio-group [(ngModel)]=\"range\">\n          <md-radio-button value=\"whole\">Whole Quran</md-radio-button>\n          <md-radio-button value=\"sura\">Specific Sura</md-radio-button>\n        </md-radio-group>\n      </div>\n      <div class=\"rowSpace\" *ngIf=\"range === 'sura'\" style=\"margin-top: 15px;\">\n        <md-select placeholder=\"Sura\" [(ngModel)]=\"suraNumber\">\n          <md-option *ngFor=\"let sura of suras\" [value]=\"sura.number\">{{sura.name}}</md-option>\n        </md-select>\n      </div>\n      <div class=\"rowSpace\">\n        <md-input-container>\n          <input mdInput type=\"number\" min=\"1\" [(ngModel)]=\"repeats\" placeholder=\"Repeat\">\n        </md-input-container>\n      </div>\n      <div class=\"rowSpace\">\n        <md-input-container>\n          <input mdInput type=\"date\" placeholder=\"Start Date\" [(ngModel)]=\"startDate\" (ngModelChange)=\"changeDuration('start', $event)\">\n        </md-input-container>\n      </div>\n      <div class=\"rowSpace\">\n        <md-input-container>\n          <input mdInput type=\"number\" [(ngModel)]=\"duration\" placeholder=\"Duration\" (ngModelChange)=\"changeDuration('duration', null)\"/>\n        </md-input-container>\n      </div>\n      <div class=\"rowSpace\">\n        <md-input-container>\n          <input mdInput type=\"date\" placeholder=\"End Date\" [(ngModel)]=\"endDate\" (ngModelChange)=\"changeDuration('end', $event)\">\n        </md-input-container>\n      </div>\n      <div class=\"rowSpace\">\n        <button md-raised-button (click)=\"submit()\"\n                [disabled]=\"submitDisability\"\n                [class.btn-light-day-mode]=\"!quranService.nightMode\" [class.btn-light-night-mode]=\"quranService.nightMode\">\n          Submit\n        </button>\n      </div>\n    </div>\n    <div *ngIf=\"isSubmitted && isNew\">\n      <md-list>\n        <md-list-item>\n          <label style=\"font-weight: bold\">Title: </label>\n          <label style=\"font-weight: normal\"> {{name}}</label>\n        </md-list-item>\n        <md-list-item *ngIf=\"description !== ''\">\n          <label style=\"font-weight: bold\">Description: </label>\n          <label style=\"font-weight: normal\"> {{description}}</label>\n        </md-list-item>\n        <md-list-item *ngIf=\"description === ''\">\n          <label style=\"font-weight: bold\">Description: </label>\n          <label style=\"font-weight: normal\"> -</label>\n        </md-list-item>\n        <md-list-item>\n          <label style=\"font-weight: bold\">Range: </label>\n          <label style=\"font-weight: normal\"> {{rangeDisplay}}</label>\n        </md-list-item>\n        <md-list-item *ngIf=\"range === 'sura'\">\n          <label style=\"font-weight: bold\">Sura: </label>\n          <label style=\"font-weight: normal\"> {{quranService.getSura(suraNumber).name}}</label>\n        </md-list-item>\n        <md-list-item>\n          <label style=\"font-weight: bold\">Repeats: </label>\n          <label style=\"font-weight: normal\"> {{repeats}}</label>\n        </md-list-item>\n        <md-list-item>\n          <label style=\"font-weight: bold\">StartDate: </label>\n          <label style=\"font-weight: normal\"> {{startDate}}</label>\n        </md-list-item>\n        <md-list-item>\n          <label style=\"font-weight: bold\">EndDate: </label>\n          <label style=\"font-weight: normal\"> {{endDate}}</label>\n        </md-list-item>\n      </md-list>\n      <div style=\"margin: 10px\">\n        <div class=\"col-md-6 col-sm-6 col-xs-6\">\n          <button md-raised-button (click)=\"create()\"\n                  [class.btn-light-day-mode]=\"!quranService.nightMode\" [class.btn-light-night-mode]=\"quranService.nightMode\">\n            Create\n          </button>\n        </div>\n        <div class=\"col-md-6 col-sm-6 col-xs-6\">\n          <button md-raised-button (click)=\"isSubmitted = false\"\n                  [class.btn-light-day-mode]=\"!quranService.nightMode\" [class.btn-light-night-mode]=\"quranService.nightMode\">\n            Edit\n          </button>\n        </div>\n      </div>\n    </div>\n    <div *ngIf=\"!isNew\">\n      <md-list>\n        <md-list-item>\n          <label class=\"title\">Name: </label>\n          <label class=\"content\"> {{khatm.khatm_name}}</label>\n        </md-list-item>\n        <md-list-item *ngIf=\"khatm.owner_shown\">\n          <label class=\"title\">Owner name: </label>\n          <label class=\"content\"> {{khatm.owner_name}}</label>\n        </md-list-item>\n        <md-list-item>\n          <label class=\"title\">Description: </label>\n          <label class=\"content\"> {{khatm.description}}</label>\n        </md-list-item>\n        <md-list-item>\n          <label class=\"title\">Read pages: </label>\n          <label class=\"content\">{{khatm.read_pages}}</label>\n        </md-list-item>\n        <md-list-item>\n          <label class=\"title\">Participating numbers: </label>\n          <label class=\"content\">{{khatm.participatings}}</label>\n        </md-list-item>\n        <md-list-item>\n          <label class=\"title\">End date: </label>\n          <label class=\"content\"> {{endDateDisplay}}</label>\n        </md-list-item>\n        <md-list-item>\n          <label class=\"title\">Rest days: </label>\n          <label class=\"content\">{{khatm.rest_days}}</label>\n        </md-list-item>\n        <md-list-item>\n          <label class=\"title\">You read:</label>\n          <label class=\"content\">{{khatm.you_read}}</label>\n        </md-list-item>\n        <md-list-item>\n          <label class=\"title\">Remain of your commitments:</label>\n          <label class=\"content\">{{khatm.you_unread}}</label>\n        </md-list-item>\n      </md-list>\n      <md-grid-list cols=\"2\" rowHeight=\"60px\">\n        <md-grid-tile>\n          <button md-raised-button (click)=\"copyLink()\"\n                  [class.btn-light-day-mode]=\"!quranService.nightMode\" [class.btn-light-night-mode]=\"quranService.nightMode\">\n            Copy Link\n          </button>\n        </md-grid-tile>\n        <md-grid-tile>\n          <button md-raised-button (click)=\"shareVia()\"\n                  [class.btn-light-day-mode]=\"!quranService.nightMode\" [class.btn-light-night-mode]=\"quranService.nightMode\">\n            Share Via\n          </button>\n        </md-grid-tile>\n        <md-grid-tile colspan=\"2\">\n          <md-input-container style=\"align-content: center\">\n            <input mdInput placeholder=\"Your Pages\"\n                   [style.background-color]=\"conditionalColoring.background\"\n                   [style.color]=\"quranService.nightMode ? '#898f8d' : '#494949'\"\n                   type=\"number\"\n                   [ngModel]=\"khatm.you_unread\"\n                   [disabled]=\"khatmService.activeKhatm.getValue() !== null && khatmService.activeKhatm.getValue().khid === khatm.khid\"\n                   (blur)=\"changeCommitPages($event)\"\n                   (ngModelChange)=\"limitClick()\">\n          </md-input-container>\n        </md-grid-tile>\n        <md-grid-tile colspan=\"2\" *ngIf=\"!khatmIsStarted\">\n          <label style=\"text-align: center; align-content: center\" [style.foreground-color]=\"conditionalColoring.text\">\n            This khatm is not started yet\n          </label>\n        </md-grid-tile>\n        <md-grid-tile colspan=\"2\" *ngIf=\"khatmIsStarted && khatm.you_read !== null && khatm.you_unread !== null\"\n                      style=\"align-content: center;\">\n          <button md-raised-button\n                  [style.background-color]=\"conditionalColoring.primary\"\n                  *ngIf=\"khatm.you_unread !== null && khatm.you_unread > 0\"\n                  [disabled]=\"isChangingCommitments || (khatmService.activeKhatm.getValue() !== null && khatmService.activeKhatm.getValue().khid === khatm.khid)\"\n                  (click)=\"goToCommitment(false)\">\n            Commit Pages\n          </button>\n        </md-grid-tile>\n        <md-grid-tile colspan=\"2\" *ngIf=\"khatmIsStarted && khatm.you_read !== null && khatm.you_unread !== null && khatm.you_unread > 0\"\n                      style=\"align-content: center\">\n          <button md-raised-button\n                  (click)=\"start_stop_Khatm()\"\n                  [style.background-color]=\"conditionalColoring.primary\"\n                  [disabled]=\"isChangingCommitments\"\n                  *ngIf=\"khatmService.activeKhatm.getValue() === null || (khatmService.activeKhatm.getValue().khid !== khatm.khid)\">\n            Reading Khatm\n          </button>\n          <button md-raised-button\n                  (click)=\"start_stop_Khatm()\"\n                  [style.background-color]=\"conditionalColoring.secondary\"\n                  [disabled]=\"isChangingCommitments\"\n                  *ngIf=\"khatmService.activeKhatm.getValue() !== null && khatmService.activeKhatm.getValue().khid === khatm.khid\">\n            Stop Khatm\n          </button>\n        </md-grid-tile>\n        <md-grid-tile colspan=\"2\" style=\"align-content: center\">\n          <button md-raised-button (click)=\"dialogRef.close()\"\n                  [class.btn-light-day-mode]=\"!quranService.nightMode\" [class.btn-light-night-mode]=\"quranService.nightMode\">\n            Close\n          </button>\n        </md-grid-tile>\n        <md-grid-tile colspan=\"2\" *ngIf=\"isLoading\">\n          <i class=\"fa fa-spinner fa-pulse fa-3x fa-fw\"></i>\n          <span class=\"sr-only\">Please wait until we send verification code ...</span>\n        </md-grid-tile>\n      </md-grid-list>\n    </div>\n  </md-card-content>\n</md-card>\n"

/***/ }),

/***/ 543:
/***/ (function(module, exports) {

module.exports = "<nav style=\"background-color: #fbfafa; padding: 20px; overflow-y: auto\" [style.height]=\"height\">\r\n  <md-grid-list cols=\"2\" rowHeight=\"20px\">\r\n    <md-grid-tile colspan=\"1\" *ngIf=\"!isLoggedIn\">\r\n      <button md-raised-button\r\n              [class.btn-dark-day-mode]=\"!nightModeVar\" [class.btn-dark-night-mode]=\"nightModeVar\"\r\n              (click)=\"register()\">Register</button>\r\n    </md-grid-tile>\r\n    <md-grid-tile colspan=\"1\" *ngIf=\"isLoggedIn\">\r\n      <button md-raised-button\r\n              [class.btn-dark-day-mode]=\"!nightModeVar\" [class.btn-dark-night-mode]=\"nightModeVar\"\r\n              (click)=\"logout()\">Logout</button>\r\n    </md-grid-tile>\r\n    <md-grid-tile colspan=\"1\" *ngIf=\"isLoggedIn\">\r\n      <a (click)=\"createKhatm()\" style=\"text-decoration: none; cursor: pointer;\">\r\n        Create Khatm\r\n      </a>\r\n    </md-grid-tile>\r\n  </md-grid-list>\r\n  <hr>\r\n  <md-grid-list cols=\"5\" rowHeight=\"50px\">\r\n    <md-grid-tile colspan=\"4\">\r\n      <md-select (ngModelChange)=\"onSelectChange($event)\"\r\n                 [(ngModel)]=\"navValue\"\r\n                 style=\"width: 100%; float: right;\">\r\n        <md-option style=\"text-align: right\" *ngFor=\"let t of suraJuzPageHizbArray[navTypeIndex]\" [value]=\"t\">{{t}}</md-option>\r\n      </md-select>\r\n    </md-grid-tile>\r\n    <md-grid-tile colspan=\"1\">\r\n      <a class=\"icon\" (click)=\"changeNavType()\" style=\"cursor: pointer;\">{{navType}}</a>\r\n    </md-grid-tile>\r\n\r\n    <md-grid-tile colspan=\"5\">\r\n      <md-input-container style=\"width: 100%\">\r\n        <input mdInput type=\"number\" (keyup.enter)=\"goToEnteredPage()\" #inputbutton placeholder=\"Page number\" />\r\n      </md-input-container>\r\n    </md-grid-tile>\r\n\r\n    <md-grid-tile colspan=\"1\">\r\n      <a mdButton (click)=\"nightMode()\" style=\"background-color: transparent; border: none; cursor: pointer\">\r\n        <i class=\"fa icon\" [class.fa-sun-o]=\"nightModeVar\" [class.fa-moon-o]=\"!nightModeVar\"\r\n           aria-hidden=\"true\" style=\"font-size: 100% !important;\">\r\n        </i>\r\n      </a>\r\n    </md-grid-tile>\r\n    <md-grid-tile colspan=\"1\">\r\n      <a mdButton (click)=\"changeFont()\" style=\"background-color: transparent; border: none; cursor: pointer\">ب</a>\r\n    </md-grid-tile>\r\n    <md-grid-tile colspan=\"1\">\r\n      <a mdButton (click)=\"zoomOut()\" style=\"background-color: transparent; border: none; cursor: pointer\">\r\n        <i class=\"fa fa-search-minus icon\" aria-hidden=\"true\"></i>\r\n      </a>\r\n    </md-grid-tile>\r\n    <md-grid-tile colspan=\"1\">\r\n      <a mdButton (click)=\"resetZoom()\" class=\"navZoom\">\r\n        {{zoomPercent}}%\r\n      </a>\r\n    </md-grid-tile>\r\n    <md-grid-tile colspan=\"1\">\r\n      <a mdButton (click)=\"zoomIn()\" style=\"background-color: transparent; border: none; cursor: pointer\">\r\n        <i class=\"fa fa-search-plus icon\" aria-hidden=\"true\"></i>\r\n      </a>\r\n    </md-grid-tile>\r\n\r\n    <md-grid-tile colspan=\"4\">\r\n      <md-select (change)=\"changeQuality()\" [(ngModel)]=\"qualityValue\" #quality style=\"width: 100%\">\r\n        <md-option *ngFor=\"let q of tartilQuality\" [value]=\"q\">{{q}}</md-option>\r\n      </md-select>\r\n    </md-grid-tile>\r\n    <md-grid-tile colspan=\"1\">\r\n      <label>Quality</label>\r\n    </md-grid-tile>\r\n\r\n    <md-grid-tile colspan=\"4\">\r\n      <md-select (change)=\"changeTelavat()\" [(ngModel)]=\"tlvtValue\" #tlvt style=\"width: 100%\">\r\n        <md-option *ngFor=\"let t of tartil\" [value]=t.subfolder>{{t.name}}</md-option>\r\n      </md-select>\r\n    </md-grid-tile>\r\n    <md-grid-tile colspan=\"1\">\r\n      <label>Telavat</label>\r\n    </md-grid-tile>\r\n\r\n    <md-grid-tile colspan=\"2\">\r\n      <button mdButton (click)=\"startAyaVoice()\" class=\"navBtn\">\r\n        <i class=\"fa icon\" [class.fa-play]=\"!playFlag\"  [class.fa-pause]=\"playFlag\" aria-hidden=\"true\" style=\"font-size: 100% !important; margin-left: 2px\"></i>\r\n      </button>\r\n    </md-grid-tile>\r\n    <md-grid-tile colspan=\"3\">\r\n      <button mdButton (click)=\"changeVolume()\" class=\"navBtn\">\r\n        <i class=\"fa icon\" [class.fa-volume-up]=\"volumeFlag\"  [class.fa-microphone-slash]=\"!volumeFlag\" aria-hidden=\"true\" style=\"font-size: 110% !important;\"></i>\r\n      </button>\r\n    </md-grid-tile>\r\n  </md-grid-list>\r\n  <div>\r\n    <div>\r\n      <audio src=\"\" class=\"audioInit\" (ended)=\"readAyaOneByOne()\" #aud0></audio>\r\n    </div>\r\n    <div>\r\n      <audio src=\"\" class=\"audioInit\" (ended)=\"readAyaOneByOne()\" #aud1></audio>\r\n    </div>\r\n    <div>\r\n      <audio src=\"\" class=\"audioInit\" (ended)=\"readAyaOneByOne()\" #aud2></audio>\r\n    </div>\r\n  </div>\r\n  <div *ngIf=\"isLoggedIn && khatms.length > 0\">\r\n    <label>My khatms</label>\r\n    <md-list>\r\n      <md-list-item *ngFor=\"let khatm of khatms\">\r\n        <a (click)=\"openKhatm(khatm)\" style=\"cursor: pointer; text-decoration: none\">{{khatm.khatm_name}}</a>\r\n      </md-list-item>\r\n    </md-list>\r\n  </div>\r\n</nav>"

/***/ }),

/***/ 544:
/***/ (function(module, exports) {

module.exports = "{{ayaTranslated}}\r\n"

/***/ }),

/***/ 545:
/***/ (function(module, exports) {

module.exports = "<table class=\"info-table\">\r\n  <tr class=\"info-row\">\r\n    <td class=\"info-column1 right-left-text\">{{suraorderAr}}. {{suraname}}</td>\r\n    <td class=\"info-column2\">\r\n      <span [ngClass]=\"[nightMode ? 'night-pic-address':'day-pic-address']\" class=\"center-text pic pagenum\">{{pagenumberAr}}</span>\r\n    </td>\r\n    <td class=\"info-column3 right-left-text\">جزء {{pageJuzNumberAr}}</td>\r\n  </tr>\r\n</table>\r\n\r\n\r\n\r\n"

/***/ }),

/***/ 546:
/***/ (function(module, exports) {

module.exports = "<span *ngFor=\"let l of layers\" [style.visibility]=\"activeLayer===l?'visible':'hidden'\" [style.zIndex]=\"activeLayer===l?null:-(l+1)\" [style.height]=\"activeLayer===l?null:'1px'\">\r\n  <!--****************************-->\r\n<div class=\"pageInfo\">\r\n  <table class=\"outer-table\">\r\n    <tr class=\"outer-row\">\r\n      <td *ngFor=\"let p of pagesArray\">\r\n        <app-page-info-table [suraname]=\"suraName[l][p]?suraName[l][p]:''\"  [pagenumber]=\"quranPages[l][p]\" [suraorder]=\"suraOrder[l][p]?suraOrder[l][p]:NaN\" [layer]=\"l\" ></app-page-info-table>\r\n      </td>\r\n    </tr>\r\n  </table>\r\n</div>\r\n<app-static-page *ngFor=\"let p of pagesArray\" [mobile]=\"mobile\" [textHeight]=\"textHeight\" [pageHeight]=\"pageHeight\" [pageWidth]=\"pageWidth\" [pageNum]=\"p\" [portrait]=\"portrait\" [endPage]=\"p===pagesArray.length-1\" [layer]=\"l\" [fontFamily]=\"fontFamily\" [halfPage]=\"halfPage[l][p]\" (back)=\"goBack()\" (forth)=\"goForth()\" (pageHeightUpdate)=\"pageHeightUpdate($event)\">\r\n  <div *ngIf=\"pageAyas\" [ngClass]=\"['quran']\" [style.fontFamily]=\"fontFamily\" (window:resize)=\"resize()\" >\r\n    <div>\r\n      <span *ngFor=\"let aya of pageAyas[l][p]\">\r\n        <div *ngIf=\"aya.bismillah\" class=\"bismillah\">\r\n          <app-sura-bismillah-info-table [bismillahText] = \"aya.text\" [suraname]=\"suraName[l][p]\"></app-sura-bismillah-info-table>\r\n        </div>\r\n        <span *ngIf=\"aya.aya && !aya.bismillah\"><app-qhizb-sajda-tooltip-sign *ngIf=\"qhizbJuzCheck(aya)\" [qhizbSajdaSign]=\"'&#x06DE;'\" [tooltipMessage] = \"qhizbJuzCheck(aya)\" [hizbNumber]=\"hizbJuzNumberCheck(aya).qhizbNum\"></app-qhizb-sajda-tooltip-sign>{{aya.text}}<app-qhizb-sajda-tooltip-sign *ngIf = \"sajdaCheck(aya)\" [qhizbSajdaSign] = \"'&#x06E9;'\" [tooltipMessage] = \"sajdaCheck(aya)\"></app-qhizb-sajda-tooltip-sign><app-aya-number-sign [ayanumber]=\"aya.aya\" [fontFamily]=\"fontFamily\" [reverse]=\"reverse\"></app-aya-number-sign> </span>\r\n      </span>\r\n    </div>\r\n  </div>\r\n</app-static-page>\r\n</span>\r\n\r\n\r\n<!--[suraorder]=\"suraOrder[l][p]?suraOrder[l][p]:NaN\"-->\r\n"

/***/ }),

/***/ 547:
/***/ (function(module, exports) {

module.exports = "<span class=\"tooltipQhizbSajda\">{{qhizbJuzSajdaSignOut}}\r\n  <span class=\"tooltiptextQhizbSajda\">\r\n    {{qhizbJuzSajdaMessage}}<app-number-translator [inputNumber]=\"qhizb_Hizb_juz_Number\"></app-number-translator>\r\n  </span>\r\n</span>\r\n"

/***/ }),

/***/ 548:
/***/ (function(module, exports) {

module.exports = "<div>\n  <md-grid-list *ngIf=\"!showVerify\" cols=\"1\" rowHeight=\"60px\">\n    <md-grid-tile colspan=\"1\">\n      <md-input-container>\n        <input mdInput type=\"email\" [(ngModel)]=\"email\" placeholder=\"Email\"/>\n      </md-input-container>\n    </md-grid-tile>\n    <md-grid-tile colspan=\"1\">\n      <md-input-container>\n        <input mdInput type=\"email\" [(ngModel)]=\"reEmail\" placeholder=\"Re-Enter Email\"/>\n      </md-input-container>\n    </md-grid-tile>\n    <md-grid-tile colspan=\"1\">\n      <md-input-container>\n        <input mdInput type=\"text\" [(ngModel)]=\"name\" placeholder=\"Display Name\"/>\n      </md-input-container>\n    </md-grid-tile>\n  </md-grid-list>\n  <md-grid-list *ngIf=\"!showVerify\" cols=\"2\" rowHeight=\"80px\">\n    <md-grid-tile colspan=\"1\" rowspan=\"1\">\n      <button md-raised-button [class.btn-light-day-mode]=\"!quranService.nightMode\" [class.btn-light-night-mode]=\"quranService.nightMode\"\n             (click)=\"register()\"\n             [disabled]=\"email === '' || reEmail === ''\">Register</button>\n    </md-grid-tile>\n    <md-grid-tile colspan=\"1\" rowspan=\"1\">\n      <button md-raised-button [class.btn-light-day-mode]=\"!quranService.nightMode\" [class.btn-light-night-mode]=\"quranService.nightMode\"\n             (click)=\"skip()\">Skip</button>\n    </md-grid-tile>\n  </md-grid-list>\n  <md-grid-list *ngIf=\"showVerify\" cols=\"2\" rowHeight=\"80px\">\n    <md-grid-tile colspan=\"2\">\n      <label>The verification code sent to the {{authService.user.getValue().email}}</label>\n    </md-grid-tile>\n    <md-grid-tile colspan=\"2\">\n      <md-input-container>\n        <input mdInput type=\"text\" maxlength=\"6\" #code placeholder=\"Code\"/>\n      </md-input-container>\n    </md-grid-tile>\n    <md-grid-tile colspan=\"1\">\n      <button md-raised-button\n              [class.btn-light-day-mode]=\"!quranService.nightMode\" [class.btn-light-night-mode]=\"quranService.nightMode\"\n              (click)=\"reSend()\">Don't get mail?</button>\n    </md-grid-tile>\n    <md-grid-tile colspan=\"1\">\n      <button md-raised-button\n              [class.btn-light-day-mode]=\"!quranService.nightMode\" [class.btn-light-night-mode]=\"quranService.nightMode\"\n              (click)=\"changeMail()\">Change mail</button>\n    </md-grid-tile>\n    <md-grid-tile colspan=\"2\">\n      <button md-raised-button\n              [class.btn-light-day-mode]=\"!quranService.nightMode\" [class.btn-light-night-mode]=\"quranService.nightMode\"\n              (click)=\"verify(code.value)\">Verify</button>\n    </md-grid-tile>\n  </md-grid-list>\n  <md-grid-list *ngIf=\"loading\" cols=\"1\" rowHeight=\"60px\">\n    <md-grid-tile colspan=\"1\">\n      <i class=\"fa fa-spinner fa-pulse fa-3x fa-fw\"></i>\n      <span class=\"sr-only\">Please wait until we send verification code ...</span>\n    </md-grid-tile>\n  </md-grid-list>\n</div>"

/***/ }),

/***/ 549:
/***/ (function(module, exports) {

module.exports = "<div style=\"text-align: center; font-weight: bold;\">\n  Please wait until we redirect you to specific pages\n</div>\n"

/***/ }),

/***/ 55:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs__ = __webpack_require__(111);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__http_service__ = __webpack_require__(91);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AuthService = (function () {
    function AuthService(httpService) {
        var _this = this;
        this.httpService = httpService;
        this.isLoggedIn = new __WEBPACK_IMPORTED_MODULE_1_rxjs__["BehaviorSubject"](false);
        this.user = new __WEBPACK_IMPORTED_MODULE_1_rxjs__["BehaviorSubject"](null);
        this.user.subscribe(function (data) {
            if (data === null || data.email === null || data.token === null)
                _this.isLoggedIn.next(false);
            else
                _this.isLoggedIn.next(true);
        }, function (err) { return _this.isLoggedIn.next(false); });
        //Load user
        this.loadUser();
    }
    AuthService.prototype.saveUser = function (userEmail, userName, userToken) {
        var tempUser = {
            email: userEmail,
            name: userName,
            token: userToken
        };
        this.user.next(tempUser);
        localStorage.setItem('user', JSON.stringify(tempUser));
    };
    AuthService.prototype.loadUser = function () {
        try {
            var tempUser = localStorage.getItem('user');
            this.user.next(JSON.parse(tempUser));
        }
        catch (err) {
            console.log(err.message);
            this.user.next(null);
        }
    };
    AuthService.prototype.saveToken = function (userToken) {
        var tempUser = this.user.getValue();
        this.saveUser((tempUser === null) ? null : tempUser.email, (tempUser === null) ? null : tempUser.name, userToken);
    };
    AuthService.prototype.saveEmail = function (userEmail) {
        var tempUser = this.user.getValue();
        this.saveUser(userEmail, (tempUser === null) ? null : tempUser.name, (tempUser === null) ? null : tempUser.token);
    };
    AuthService.prototype.saveName = function (userName) {
        var tempUser = this.user.getValue();
        this.saveUser(tempUser.email, userName, tempUser.token);
    };
    AuthService.prototype.removeUser = function () {
        localStorage.removeItem('user');
        this.user.next(null);
    };
    AuthService.prototype.logout = function () {
        this.removeUser();
        this.isLoggedIn.next(false);
    };
    AuthService.prototype.register = function (userEmail, userName) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.httpService.putData('user', { email: userEmail, name: userName }, false).subscribe(function (data) {
                _this.saveUser(userEmail, userName, null);
                console.log('email:' + _this.user.getValue().email);
                console.log('name:' + _this.user.getValue().name);
                resolve();
            }, function (err) {
                reject(err);
            });
        });
    };
    AuthService.prototype.verify = function (code) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.httpService.postData('user/auth', { email: _this.user.getValue().email, code: code }, false)
                .subscribe(function (data) {
                var token = data.json().token;
                _this.isLoggedIn.next(true);
                _this.saveToken(token);
                console.log('EMAIL:' + _this.user.getValue().email);
                console.log('TOKEN:' + token);
                _this.httpService.deleteData('user/auth', true, _this.user.getValue().email, token)
                    .subscribe(function (res) { return resolve(); }, function (er) { return reject(er); });
            }, function (err) {
                reject(err);
            });
        });
    };
    return AuthService;
}());
AuthService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Injectable */])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__http_service__["a" /* HttpService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__http_service__["a" /* HttpService */]) === "function" && _a || Object])
], AuthService);

var _a;
//# sourceMappingURL=C:/Users/ali71/WebstormProjects/quran-together/src/auth.service.js.map

/***/ }),

/***/ 550:
/***/ (function(module, exports) {

module.exports = "<div *ngIf=\"pageNum===0\" class=\"tapper\" [class.clear]=\"!loading||explained\" [class.explain]=\"loading&&!explained\" [ngStyle]=\"{'left':'0px','height':pageHeight+'px','width':pageWidth/3+'px','text-align':'right'}\" (click)=\"goForth()\" #tapperRight><i style=\"font-size:30px\"  class=\"fa fa-arrow-left\" aria-hidden=\"true\"></i><br>tap/click to the next page</div>\r\n<div *ngIf=\"endPage\" class=\"tapper\" [class.clear]=\"!loading||explained\" [class.explain]=\"loading&&!explained\" [ngStyle]=\"{'right':'0px','height':pageHeight+'px','width':pageWidth/3+'px','text-align':'left'}\" (click)=\"goBack()\" #tapperLeft><i style=\"font-size:30px\" class=\"fa fa-arrow-right\" aria-hidden=\"true\"></i><br>tap/click to the previous page</div>\r\n<div *ngIf=\"loading\" class=\"tapper explain\" [ngStyle]=\"{'left': (explained?0:pageWidth/3)+'px','width': (explained?pageWidth:pageWidth/3)+'px','height':pageHeight+'px'}\"><i class=\"fa fa-spinner fa-spin fa-3x fa-fw\"></i><span class=\"sr-only\">Loading...</span></div>\r\n<div [class.border-day]=!nightMode [class.border-night]=nightMode #border>\r\n<div class=\"internal\" #page>\r\n  <ng-content></ng-content>\r\n</div>\r\n</div>\r\n"

/***/ }),

/***/ 551:
/***/ (function(module, exports) {

module.exports = "<table class=\"bismillahtable\">\r\n  <tr class=\"bismillahrow\">\r\n    <td class=\"bismillahcol-1-3\" [ngClass]=\"[nightMode ? 'night-pic-address-col-1-3':'day-pic-address-col-1-3']\">\r\n        <table class=\"bismillahrow\">\r\n          <tr class=\"fontinit\">\r\n            <td class=\"topayat\">آیات</td>\r\n          </tr>\r\n          <tr class=\"fontinit\">\r\n            <td class=\"downayat\"><app-number-translator style=\"vertical-align: top\" [inputNumber]=\"suraAyaNumber\"></app-number-translator></td>\r\n          </tr>\r\n        </table>\r\n    </td>\r\n    <td class=\"bismillahcol2\"  [ngClass]=\"[nightMode ? 'night-pic-address-col2':'day-pic-address-col2']\"> سوره {{suraArabicName}}</td>\r\n    <td class=\"bismillahcol-1-3\" [ngClass]=\"[nightMode ? 'night-pic-address-col-1-3':'day-pic-address-col-1-3']\">\r\n        <table class=\"bismillahrow\">\r\n          <tr class=\"fontinit\">\r\n            <td class=\"toptanzil\" [class.pic-makki-day]=(imgflag)&&(!nightMode) [class.pic-makki-night]=(imgflag)&&(nightMode)  [class.pic-madani-day]=(!imgflag)&&(!nightMode)  [class.pic-madani-night]=(!imgflag)&&(nightMode)></td>\r\n          </tr>\r\n          <tr class=\"fontinit\">\r\n            <td class=\"downtanzil\">\r\n              <span style=\"position:relative; display:inline-block; top:-20px\">{{suraTanzilLocation}}</span>\r\n            </td>\r\n          </tr>\r\n        </table>\r\n    </td>\r\n  </tr>\r\n</table>\r\n<div class=\"bismillah\">{{bismillahText}}</div>\r\n\r\n\r\n\r\n\r\n\r\n"

/***/ }),

/***/ 56:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__http_service__ = __webpack_require__(91);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__auth_service__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs__ = __webpack_require__(111);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_moment_timezone__ = __webpack_require__(169);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_moment_timezone___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_moment_timezone__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return KhatmService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var KhatmService = (function () {
    function KhatmService(httpService, authService) {
        this.httpService = httpService;
        this.authService = authService;
        this.khatms = new __WEBPACK_IMPORTED_MODULE_3_rxjs__["BehaviorSubject"]([]);
        this.activeKhatm = new __WEBPACK_IMPORTED_MODULE_3_rxjs__["BehaviorSubject"](null);
    }
    KhatmService.prototype.createKhatm = function (data) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.httpService.putData('khatm', data, true, _this.authService.user.getValue().email, _this.authService.user.getValue().token)
                .subscribe(function (data) {
                _this.loadKhatm(_this.authService.user.getValue().email);
                resolve();
            }, function (err) {
                console.log(err);
                reject(err);
            });
        });
    };
    KhatmService.prototype.loadKhatm = function (userEmail) {
        var _this = this;
        this.httpService.getData('khatm', true, this.authService.user.getValue().email, this.authService.user.getValue().token)
            .subscribe(function (res) {
            var data = res.json();
            console.log(data);
            var tempList = [];
            var mDate = __WEBPACK_IMPORTED_MODULE_4_moment_timezone__(new Date());
            for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
                var item = data_1[_i];
                if (__WEBPACK_IMPORTED_MODULE_4_moment_timezone__(item.end_date).diff(mDate, 'days') >= 0)
                    tempList.push(item);
            }
            _this.khatms.next(tempList);
        }, function (err) {
            console.log(err.message);
            _this.khatms.next([]);
        });
    };
    KhatmService.prototype.loadAllCommitments = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.httpService.getData('khatm/commitment', true, _this.authService.user.getValue().email, _this.authService.user.getValue().token)
                .subscribe(function (res) {
                var data = res.json();
                console.log('DATACommitments:', data);
                var promiseList = [];
                // data.forEach(el => promiseList.push(this.storeKhatmPages(el.khid, el.pages, 'add')));
                data.forEach(function (el) { return promiseList.push(_this.commitmentsReconciliation(el.khid, el.pages)); });
                Promise.all(promiseList)
                    .then(function (res) { return resolve(); })
                    .catch(function (err) { return reject(err); });
            }, function (err) {
                console.log(err.message);
                reject(err);
            });
        });
    };
    KhatmService.prototype.getPages = function (number, khatm_id, type) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.httpService.postData('khatm/commitment/auto', { khid: khatm_id, pages: number }, true, _this.authService.user.getValue().email, _this.authService.user.getValue().token)
                .subscribe(function (res) {
                var data = res.json();
                if (data === null)
                    resolve();
                else {
                    //Save/Update page numbers
                    _this.storeKhatmPages(khatm_id, data, type);
                    _this.updateKhatmCommtiments(khatm_id, number);
                    resolve();
                }
            }, function (err) {
                console.log(err.message);
                reject(err);
            });
        });
    };
    KhatmService.prototype.storeKhatms = function (khatms) {
        localStorage.setItem('khatms', JSON.stringify(khatms));
    };
    KhatmService.prototype.getKhatms = function () {
        return (localStorage.getItem('khatms') === null) ? null : JSON.parse(localStorage.getItem('khatms'));
    };
    KhatmService.prototype.storeKhatmPages = function (khatm_id, pages, action) {
        var value = (localStorage.getItem('khatm_' + khatm_id) === null) ? null : JSON.parse(localStorage.getItem('khatm_' + khatm_id));
        if (value != null) {
            if (action === 'add') {
                value = value.concat(pages);
            }
            else if (action === 'delete') {
                var pNumbers_1 = pages.map(function (el) { return el.page_number; });
                value = value.filter(function (el) { return pNumbers_1.findIndex(function (i) { return i === el.page_number; }) === -1; });
            }
            else if (action === 'update') {
                var pNumbers_2 = pages.map(function (el) { return el.page_number; });
                value = value.filter(function (el) { return pNumbers_2.findIndex(function (i) { return i === el.page_number; }) === -1; });
                value = value.concat(pages);
            }
        }
        else {
            value = pages;
        }
        if (value.length === 0)
            localStorage.removeItem('khatm_' + khatm_id);
        else
            localStorage.setItem('khatm_' + khatm_id, JSON.stringify(value));
    };
    KhatmService.prototype.getKhatmPages = function (khatm_id) {
        return (localStorage.getItem('khatm_' + khatm_id) === null) ? null : JSON.parse(localStorage.getItem('khatm_' + khatm_id));
    };
    KhatmService.prototype.updateKhatmCommtiments = function (khatm_id, page_numbers) {
        return new Promise(function (resolve, reject) {
            try {
                var khatms = (localStorage.getItem('khatms') === null) ? null : JSON.parse(localStorage.getItem('khatms'));
                var data = khatms.find(function (el) { return el.khid === khatm_id; });
                console.log(data);
                data.you_unread = page_numbers;
                localStorage.setItem('khatms', JSON.stringify(khatms));
                resolve();
            }
            catch (err) {
                reject(err);
            }
        });
    };
    KhatmService.prototype.start_stop_Khatm = function (khatm) {
        if (khatm.you_read === null || khatm.you_unread === null)
            this.activeKhatm.next(null);
        else if (this.activeKhatm.getValue() === null || this.activeKhatm.getValue().khid !== khatm.khid) {
            var actKhatm = Object.assign({}, khatm);
            try {
                var value = this.getKhatmPages(khatm.khid);
                if (value === null)
                    actKhatm.pages = value;
                this.activeKhatm.next(actKhatm);
            }
            catch (err) {
                console.log(err);
                this.activeKhatm.next(null);
            }
        }
        else if (this.activeKhatm.getValue().khid === khatm.khid) {
            this.activeKhatm.next(null);
            // console.log('Active khatm is: ', this.activeKhatm.getValue());
        }
    };
    KhatmService.prototype.commitPages = function (khatm_id, pages, is_read) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var cids = pages.map(function (el) { return el.cid; });
            if (pages === null || pages === undefined || pages.length === 0)
                resolve();
            else {
                _this.httpService.postData('khatm/commitment/commit', { cids: cids, isread: is_read }, true, _this.authService.user.getValue().email, _this.authService.user.getValue().token)
                    .subscribe(function (data) {
                    //Remove khatm commitments from storage
                    try {
                        if (is_read)
                            _this.storeKhatmPages(khatm_id, pages, 'delete');
                        else
                            _this.storeKhatmPages(khatm_id, pages, 'add');
                        resolve();
                    }
                    catch (err) {
                        reject(err);
                    }
                }, function (err) {
                    console.log(err);
                    reject(err);
                });
            }
        });
    };
    KhatmService.prototype.clearStorage = function () {
        if (this.khatms.getValue() !== null) {
            var khids = this.khatms.getValue().map(function (el) { return el.khid; });
            for (var _i = 0, khids_1 = khids; _i < khids_1.length; _i++) {
                var id = khids_1[_i];
                localStorage.removeItem('khatm_' + id);
            }
        }
        localStorage.removeItem('khatms');
        this.khatms.next(null);
        this.activeKhatm.next(null);
    };
    KhatmService.prototype.commitmentsReconciliation = function (khatm_id, pages) {
        var values = (localStorage.getItem('khatm_' + khatm_id) === null) ? null : JSON.parse(localStorage.getItem('khatm_' + khatm_id));
        var updateServer_List = [];
        var updateLocal_List = [];
        if (values === null) {
            pages.forEach(function (el) {
                updateLocal_List.push({ type: 'add', page: el });
            });
        }
        else if (values.length > pages.length) {
            var _loop_1 = function (index) {
                if (values.findIndex(function (el) { return el.cid === pages[index].cid; }) === -1) {
                    updateLocal_List.push({ type: 'add', page: pages[index] });
                }
                else if (values.find(function (el) { return el.cid === pages[index].cid; }).isread !== pages[index].isread) {
                    updateLocal_List.push({ type: 'update', page: pages[index] });
                }
            };
            for (var index = 0; index < pages.length; index++) {
                _loop_1(index);
            }
            values.forEach(function (el) {
                if (pages.find(function (i) { return i.cid === el.cid; }) === undefined) {
                    updateServer_List.push({ type: 'add', page: el });
                }
            });
        }
        else {
            var _loop_2 = function (index) {
                if (pages.findIndex(function (el) { return el.cid === values[index].cid; }) === -1) {
                    updateServer_List.push({ type: 'add', page: values[index] });
                }
                else if (pages.find(function (el) { return el.cid === values[index].cid; }).isread !== values[index].isread) {
                    updateServer_List.push({ type: 'update', page: values[index] });
                }
            };
            for (var index = 0; index < values.length; index++) {
                _loop_2(index);
            }
            pages.forEach(function (el) {
                if (values.find(function (i) { return i.cid === el.cid; }) === undefined) {
                    updateLocal_List.push({ type: 'add', page: el });
                }
            });
        }
        //Update server
        var readPages = updateServer_List.filter(function (el) { return el.page.isread === true; }).map(function (el) { return el.page; });
        var unreadPages = updateServer_List.filter(function (el) { return el.page.isread === false; }).map(function (el) { return el.page; });
        if (readPages.length > 0)
            this.commitPages(khatm_id, readPages, true);
        if (unreadPages.length > 0)
            this.commitPages(khatm_id, unreadPages, false);
        //Update local
        var addPages = updateLocal_List.filter(function (el) { return el.type === 'add'; }).map(function (el) { return el.page; });
        var updatePages = updateLocal_List.filter(function (el) { return el.type === 'update'; }).map(function (el) { return el.page; });
        if (addPages.length > 0)
            this.storeKhatmPages(khatm_id, addPages, 'add');
        if (updatePages.length > 0)
            this.storeKhatmPages(khatm_id, updatePages, 'update');
    };
    return KhatmService;
}());
KhatmService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Injectable */])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__http_service__["a" /* HttpService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__http_service__["a" /* HttpService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__auth_service__["a" /* AuthService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__auth_service__["a" /* AuthService */]) === "function" && _b || Object])
], KhatmService);

var _a, _b;
//# sourceMappingURL=C:/Users/ali71/WebstormProjects/quran-together/src/khatm.service.js.map

/***/ }),

/***/ 57:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs__ = __webpack_require__(111);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(54);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MsgService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var MsgService = (function () {
    function MsgService() {
        this.errStream = new __WEBPACK_IMPORTED_MODULE_1_rxjs__["Subject"]();
        this.err$ = this.errStream.asObservable();
        this.msgStream = new __WEBPACK_IMPORTED_MODULE_1_rxjs__["Subject"]();
        this.msg$ = this.msgStream.asObservable();
        this.warningStream = new __WEBPACK_IMPORTED_MODULE_1_rxjs__["Subject"]();
        this.warn$ = this.warningStream.asObservable();
    }
    MsgService.prototype.error = function (err) {
        err = this.changeToUnderstandableMessage(err);
        var ro = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["b" /* ResponseOptions */]();
        var errMsg = '';
        try {
            if (err.json().Message)
                errMsg = err.json().Message;
            else if (typeof err.json().Message === "object")
                errMsg = '';
        }
        catch (e) {
            errMsg = err.text();
        }
        ro.body = errMsg;
        var newErr = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["c" /* Response */](ro);
        newErr.statusText = err.statusText;
        newErr.status = err.status;
        this.errStream.next(newErr);
    };
    MsgService.prototype.message = function (msg) {
        this.msgStream.next(msg);
    };
    MsgService.prototype.warn = function (msg) {
        this.warningStream.next(msg);
    };
    MsgService.prototype.changeToUnderstandableMessage = function (msg) {
        var data = msg._body;
        var resOptions = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["b" /* ResponseOptions */]();
        if (data.indexOf('foreign key constraint') !== -1) {
            resOptions.body = 'Can not delete this item because other data items depend on it.';
            var res = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["c" /* Response */](resOptions);
            res.statusText = 'Data Integrity Error';
            return res;
        }
        else if (data.indexOf('duplicate key value') !== -1) {
            var n = 'constraint "';
            var constraint = data.substring(data.indexOf(n) + n.length, data.indexOf('_key"')).replace(/\_/g, ' ');
            resOptions.body = "Can not add this item because same \"" + constraint + "\" already exists.";
            var res = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["c" /* Response */](resOptions);
            res.statusText = 'Data Integrity Error';
            return res;
        }
        else if (data.indexOf('null value') !== -1 && data.indexOf('not-null constraint') !== -1) {
            var n = 'in column "';
            var constraint = data.substring(data.indexOf(n) + n.length, data.indexOf('" violates')).replace(/\_/g, ' ');
            resOptions.body = "The \"" + constraint + "\" field cannot be blank.";
            var res = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["c" /* Response */](resOptions);
            res.statusText = 'Data Integrity Error';
            return res;
        }
        else
            return msg;
    };
    return MsgService;
}());
MsgService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Injectable */])(),
    __metadata("design:paramtypes", [])
], MsgService);

//# sourceMappingURL=C:/Users/ali71/WebstormProjects/quran-together/src/msg.service.js.map

/***/ }),

/***/ 72:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(6);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WindowRef; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/**
 * Created by Ali on 5/28/2017.
 */

function _window() {
    return window;
}
var WindowRef = (function () {
    function WindowRef() {
    }
    WindowRef.prototype.getWindow = function () {
        return _window();
    };
    return WindowRef;
}());
WindowRef = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Injectable */])(),
    __metadata("design:paramtypes", [])
], WindowRef);

//# sourceMappingURL=C:/Users/ali71/WebstormProjects/quran-together/src/windowRef.js.map

/***/ }),

/***/ 800:
/***/ (function(module, exports) {

/**
 * Created by Amin on 16/11/2016.
 */
var isFirefox = typeof InstallTrigger !== 'undefined';
var isChrome = !!window.chrome && !!window.chrome.webstore;
var isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0 || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || safari.pushNotification);
var ua = window.navigator.userAgent;
var iOS = !!ua.match(/iPad/i) || !!ua.match(/iPhone/i);
var webkit = !!ua.match(/WebKit/i);
var iOSSafari = iOS && webkit && !ua.match(/CriOS/i);
module.exports = {isChrome:isChrome, isFirefox:isFirefox, isSafari:isSafari||iOSSafari,isiOS: iOS};


/***/ }),

/***/ 809:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(341);


/***/ }),

/***/ 91:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(54);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HttpService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var HttpService = (function () {
    function HttpService(http) {
        this.http = http;
        this.serverAddress = 'api';
    }
    HttpService.prototype.postData = function (address, data, needAuthDetails, email, token) {
        if (email === void 0) { email = null; }
        if (token === void 0) { token = null; }
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* Headers */]();
        if (needAuthDetails) {
            headers.append('email', email);
            headers.append('token', token);
        }
        return this.http.post(this.serverAddress + '/' + address, data, {
            headers: headers
        });
    };
    HttpService.prototype.putData = function (address, data, needAuthDetails, email, token) {
        if (email === void 0) { email = null; }
        if (token === void 0) { token = null; }
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* Headers */]();
        if (needAuthDetails) {
            headers.append('email', email);
            headers.append('token', token);
        }
        return this.http.put(this.serverAddress + '/' + address, data, {
            headers: headers
        });
    };
    HttpService.prototype.getData = function (address, needAuthDetails, email, token) {
        if (email === void 0) { email = null; }
        if (token === void 0) { token = null; }
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* Headers */]();
        if (needAuthDetails) {
            headers.append('email', email);
            headers.append('token', token);
        }
        return this.http.get(this.serverAddress + '/' + address, {
            headers: headers
        });
    };
    HttpService.prototype.deleteData = function (address, needAuthDetails, email, token) {
        if (email === void 0) { email = null; }
        if (token === void 0) { token = null; }
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* Headers */]();
        if (needAuthDetails) {
            headers.append('email', email);
            headers.append('token', token);
        }
        return this.http.delete(this.serverAddress + '/' + address, {
            headers: headers
        });
    };
    return HttpService;
}());
HttpService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Injectable */])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["e" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["e" /* Http */]) === "function" && _a || Object])
], HttpService);

var _a;
//# sourceMappingURL=C:/Users/ali71/WebstormProjects/quran-together/src/http.service.js.map

/***/ })

},[809]);
//# sourceMappingURL=main.bundle.js.map