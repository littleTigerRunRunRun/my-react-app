import { Group, type IGroupInputData } from 'leafer-ui'
import DC from '../defaultConfig'

export class CenterGroup<TInputData = IGroupInputData> extends Group<TInputData> {
  constructor() {
    super({
      ...DC.center.position
    } as TInputData)

    
  }
}