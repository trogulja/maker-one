export type TState = 'init' | 'create' | 'list' | 'search' | 'open' | 'exit';

export interface ITargets {
  sheetId: string
  sheetRange: string
  projectsFolder: string
}

export interface IProjects extends Record<string, string> {
  Rb: string // YYnnn format (e.g. 23078)
  Datum: string // D.M.YYYY. format (e.g. 28.9.2023.)
  Projekt: string // just a name (e.g. "Mehrzer Inox 8L")
  "Ime projekta": string // project folder name (e.g. "23078-09-28 Mehrzer Inox 8L")
}
