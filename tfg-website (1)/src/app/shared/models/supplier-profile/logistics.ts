

export class LogisticsClass {
    id?: string;
    name!: string;
    tool!: string;
    logisticsRoutine!: string;
    temperature!: string;

    clear() {
        this.id = '';
        this.name = '';
        this.tool = '';
        this.logisticsRoutine = '';
        this.temperature = '';
    }

}
