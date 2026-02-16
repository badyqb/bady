export const ASCII_SETS = {
  basic: {
    name: 'Basic',
    chars: [' ', '.', ':', '-', '=', '+', '*', '#', '@'],
  },
  shading: {
    name: 'Shading',
    chars: [' ', '░', '▒', '▓', '█'],
  },
  blocks: {
    name: 'Blocks',
    chars: ['▀', '▄', '█', '▌', '▐', '▖', '▗', '▘', '▙', '▚', '▛', '▜', '▝', '▞', '▟'],
  },
  lines: {
    name: 'Lines',
    chars: ['─', '│', '┌', '┐', '└', '┘', '├', '┤', '┬', '┴', '┼', '═', '║', '╔', '╗', '╚', '╝'],
  },
  symbols: {
    name: 'Symbols',
    chars: ['○', '●', '◯', '◉', '◐', '◑', '◒', '◓', '◔', '◕', '☆', '★', '♠', '♣', '♥', '♦'],
  },
  alphanumeric: {
    name: 'Alphanumeric',
    chars: [
      ...'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'.split(''),
    ],
  },
}

export type CharSetKey = keyof typeof ASCII_SETS

export const getCharSet = (key: CharSetKey) => ASCII_SETS[key]

export const getAllChars = (): string[] => {
  return Object.values(ASCII_SETS).flatMap((set) => set.chars)
}
