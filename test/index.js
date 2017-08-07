import { process } from '../index';

describe('css-scope', () => {
  it('should scope to single class', () => {
    expect(process('.hidden { display: none; }'))
      .to.equal('.hidden.scope {\n  display: none;\n}');
  });
});
