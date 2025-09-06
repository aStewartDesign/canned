import { writable } from 'svelte/store';

export type MessageType = 'default' | 'success' | 'error';
export interface IAction {
  text: string;
  fn: () => void;
}

export class Message {
  public readonly id = crypto.randomUUID();
  constructor(
    public readonly type: MessageType = 'default',
    public text: string,
    public readonly action?: IAction,
  ) {}
}

export const messageStore = writable<Message[]>([]);

export const addMessage = (text: string, type: MessageType = 'default', action?: IAction) => {
  messageStore.update((messages) => {
    return [...messages, new Message(type, text, action)];
  });
};
