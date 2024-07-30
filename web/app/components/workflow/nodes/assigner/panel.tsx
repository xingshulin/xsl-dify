import type { FC } from 'react'
import React from 'react'
import { useTranslation } from 'react-i18next'

import VarReferencePicker from '../_base/components/variable/var-reference-picker'
import RadioCardItem from '../_base/components/radio-card-item'
import useConfig from './use-config'
import { WriteMode } from './types'
import type { AssignerNodeType } from './types'
import Field from '@/app/components/workflow/nodes/_base/components/field'
import { type NodePanelProps } from '@/app/components/workflow/types'

const i18nPrefix = 'workflow.nodes.assigner'

const Panel: FC<NodePanelProps<AssignerNodeType>> = ({
  id,
  data,
}) => {
  const { t } = useTranslation()

  const {
    readOnly,
    inputs,
    handleAssignedVarChanges,
    handleWriteModeChange,
    writeModeTypes,
    filterToAssignedVar,
    handleToAssignedVarChange,
  } = useConfig(id, data)

  return (
    <div className='mt-2'>
      <div className='px-4 pb-4 space-y-4'>
        <Field
          title={t(`${i18nPrefix}.assignedVariable`)}
        >
          <VarReferencePicker
            readonly={readOnly}
            nodeId={id}
            isShowNodeName
            value={inputs.assigned_variable_selector || []}
            onChange={handleAssignedVarChanges}
          />
        </Field>
        <Field
          title={t(`${i18nPrefix}.writeMode`)}
        >
          <div className='grid grid-cols-3 gap-2'>
            {writeModeTypes.map(type => (
              <RadioCardItem
                key={type}
                title={t(`${i18nPrefix}.${type}`)}
                onSelect={handleWriteModeChange(type)}
                isSelected={inputs.write_mode === type}
                textCenter
              />
            ))}
          </div>
        </Field>
        {inputs.write_mode !== WriteMode.Clear && (
          <Field
            title={t(`${i18nPrefix}.setVariable`)}
          >
            <VarReferencePicker
              readonly={readOnly}
              nodeId={id}
              isShowNodeName
              value={inputs.input_variable_selector || []}
              onChange={handleToAssignedVarChange}
              filterVar={filterToAssignedVar}
            />
          </Field>
        )}

      </div>
    </div>
  )
}

export default React.memo(Panel)