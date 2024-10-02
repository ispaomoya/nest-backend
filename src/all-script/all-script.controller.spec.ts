import { Test, TestingModule } from '@nestjs/testing';
import { AllScriptController } from './all-script.controller';

describe('AllScriptController', () => {
  let controller: AllScriptController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AllScriptController],
    }).compile();

    controller = module.get<AllScriptController>(AllScriptController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
