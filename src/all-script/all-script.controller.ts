import { Controller, UseGuards, Get, Post, Body, Param, Query } from '@nestjs/common';
import { Public } from '../common/public.decorator';


import { AllScriptService } from './all-script.service';
@Controller('/b/api/allScript')
export class AllScriptController {
    constructor(private readonly AllScriptService: AllScriptService) {}

    @Post()
    @Public()
      create() {
        return this.AllScriptService.runScript();
      }
}
