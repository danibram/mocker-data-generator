import './array-includes';
import { Mocker } from './lib/Mocker';
export * from './lib/Mocker';
export * from './lib/Schema';
export * from './lib/Generator';
export var mocker = function (opts) { return new Mocker(opts); };
export default mocker;
//# sourceMappingURL=index.js.map