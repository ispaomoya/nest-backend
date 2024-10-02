import { Test, TestingModule } from '@nestjs/testing';
import { AllScriptService } from './all-script.service';

describe('AllScriptService', () => {
  let service: AllScriptService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AllScriptService],
    }).compile();

    service = module.get<AllScriptService>(AllScriptService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
