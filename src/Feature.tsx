import { useState } from "react";
import { useSharedStickyBoard } from "@baditaflorin/mesh-common";
import type { MeshConfig, YRoom } from "@baditaflorin/mesh-common";

type Props = { room: YRoom | null; config: MeshConfig };
const COLORS = ["amber", "blue", "coral", "mint", "violet"] as const;

export function Feature({ room, config }: Props) {
  const board = useSharedStickyBoard(room);
  const [draft, setDraft] = useState("");
  const [color, setColor] = useState<(typeof COLORS)[number]>("amber");
  const add = () => {
    if (board.add(draft, { color })) setDraft("");
  };
  return (
    <main className="creative-app sticky-app">
      <p className="eyebrow">Shared thinking canvas</p>
      <h1>Sticky Board</h1>
      <p className="lede">Drop a short thought. Everyone in the room sees it instantly.</p>
      <form
        className="composer"
        onSubmit={(event) => {
          event.preventDefault();
          add();
        }}
      >
        <label className="sr-only" htmlFor="sticky-note">
          A new sticky note
        </label>
        <input
          id="sticky-note"
          maxLength={500}
          onChange={(event) => setDraft(event.target.value)}
          placeholder="Write a thought…"
          value={draft}
        />
        <select
          aria-label="Sticky note colour"
          onChange={(event) => setColor(event.target.value as (typeof COLORS)[number])}
          value={color}
        >
          {COLORS.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
        <button disabled={!draft.trim() || !room} type="submit">
          Add note
        </button>
      </form>
      <section aria-label="Shared sticky notes" className="sticky-grid">
        {board.notes.map((note) => (
          <article className={`sticky ${note.color}`} key={note.id}>
            <p>{note.text}</p>
            <small>{note.createdBy === room?.peerId ? "You" : "A peer"}</small>
            <div className="card-actions">
              <button type="button" onClick={() => board.move(note.id, note.x + 1, note.y + 1)}>
                Nudge
              </button>
              {note.createdBy === room?.peerId ? (
                <button type="button" onClick={() => board.removeMine(note.id)}>
                  Remove
                </button>
              ) : null}
            </div>
          </article>
        ))}
      </section>
      {board.notes.length === 0 ? (
        <p className="empty">Start with a win, a question, or a wild idea.</p>
      ) : null}
      <p aria-live="polite" className="status">
        {room
          ? `${board.notes.length} shared note${board.notes.length === 1 ? "" : "s"}`
          : config.description}
      </p>
    </main>
  );
}
