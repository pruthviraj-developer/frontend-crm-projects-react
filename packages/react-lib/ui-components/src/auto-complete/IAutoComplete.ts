export type AutoCompleteOption = Record<'name' | 'value', string | number>;
export interface AutoCompleteProps<OptionType extends AutoCompleteOption> {
  options: Array<OptionType>;
}
