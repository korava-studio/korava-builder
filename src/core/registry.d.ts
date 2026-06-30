export interface Command {
    name: string;
    description: string;
    run(args: string[]): void;
}
export declare class CommandRegistry {
    private commands;
    register(command: Command): void;
    execute(name: string, args: string[]): void;
    list(): Command[];
}
//# sourceMappingURL=registry.d.ts.map