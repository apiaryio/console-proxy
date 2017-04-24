import '../JsAgent';

describe('non array subdomains parameter', () => {
  it('should throw an exception', () => {
    expect(() => window.Apiary.createAgent({ subdomains: 'mysubdomain' })).toThrow();
  });
});

describe('single channel creation', () => {
  beforeEach(() => {
    window.Apiary.createAgent({ subdomains: ['mysubdomain'] });
  });

  afterEach(() => {
    window.Apiary.destroyAgent();
  });

  it('should create 2 channels', () => {
    expect(window.Apiary.channels.length).toBe(2);
  });
});

describe('multiple channel creation', () => {
  beforeEach(() => {
    window.Apiary.createAgent({ subdomains: ['subdomain1', 'subdomain2'] });
  });

  afterEach(() => {
    window.Apiary.destroyAgent();
  });

  it('should create 4 channels', () => {
    expect(window.Apiary.channels.length).toBe(4);
  });
});
