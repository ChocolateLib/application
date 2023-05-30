import { Application, ApplicationEvents } from "./application";

/**Defines elements inheriting from the base*/
export let defineElement = <T extends ApplicationEvents>(app: typeof Application<T>) => {
    let namespace = app.appNameSpace();
    let check = app.appName;
    let defineName = '';
    let runner = app;
    // @ts-expect-error
    while (runner !== HTMLElement) {
        if (namespace !== runner.appNameSpace()) {
            break;
        }
        let name = runner.appName();
        runner = Object.getPrototypeOf(runner);
        if (check === runner.appName) {
            throw new Error('Element uses same name as ancestor, abstract classes should return \'@abstract@\'');
        }
        if (!name.length) {
            throw new Error('Element doesn\'t define element name');
        }
        if (name !== '@abstract@') {
            defineName = '-' + name + defineName;
        }
    }
    defineName = namespace + defineName;
}