"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AllScriptController = void 0;
const common_1 = require("@nestjs/common");
const public_decorator_1 = require("../common/public.decorator");
const all_script_service_1 = require("./all-script.service");
let AllScriptController = class AllScriptController {
    constructor(AllScriptService) {
        this.AllScriptService = AllScriptService;
    }
    create() {
        return this.AllScriptService.runScript();
    }
};
exports.AllScriptController = AllScriptController;
__decorate([
    (0, common_1.Post)(),
    (0, public_decorator_1.Public)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AllScriptController.prototype, "create", null);
exports.AllScriptController = AllScriptController = __decorate([
    (0, common_1.Controller)('/b/api/allScript'),
    __metadata("design:paramtypes", [all_script_service_1.AllScriptService])
], AllScriptController);
//# sourceMappingURL=all-script.controller.js.map