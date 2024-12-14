import { TestBed } from '@angular/core/testing';

import { HistoricoInteracaoService } from './historico-interacao.service';

describe('HistoricoInteracaoService', () => {
  let service: HistoricoInteracaoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HistoricoInteracaoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
