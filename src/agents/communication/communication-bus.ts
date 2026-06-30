type Listener = (payload: unknown) => void;

interface PendingRequest {
  resolve: (value: unknown) => void;
  reject: (reason?: unknown) => void;
}

export class CommunicationBus {
  private listeners = new Map<string, Set<Listener>>();
  private pending = new Map<string, PendingRequest>();

  on(event: string, listener: Listener) {
    const set = this.listeners.get(event) ?? new Set();
    set.add(listener);
    this.listeners.set(event, set);
  }

  off(event: string, listener: Listener) {
    this.listeners.get(event)?.delete(listener);
  }

  send(senderId: string, recipientId: string, payload: unknown) {
    this.emit(`message.${recipientId}`, { senderId, payload });
  }

  broadcast(senderId: string, payload: unknown) {
    this.emit("broadcast", { senderId, payload });
  }

  request(senderId: string, recipientId: string, payload: unknown) {
    const requestId = `req-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    return new Promise<unknown>((resolve, reject) => {
      this.pending.set(requestId, { resolve, reject });
      this.emit(`request.${recipientId}`, { requestId, senderId, payload });
    });
  }

  response(requestId: string, payload: unknown) {
    const pending = this.pending.get(requestId);
    if (!pending) return;
    pending.resolve(payload);
    this.pending.delete(requestId);
  }

  event(event: string, payload: unknown) {
    this.emit(event, payload);
  }

  private emit(event: string, payload: unknown) {
    const set = this.listeners.get(event);
    if (!set) return;
    for (const listener of Array.from(set)) {
      listener(payload);
    }
  }
}
