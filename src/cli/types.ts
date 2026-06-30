export interface CLICommand {
  name: string;
  description: string;
  usage?: string;
  execute(args: string[]): Promise<number> | number;
}
