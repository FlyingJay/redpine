import React from 'react'
import styled from 'styled-components'

import { paths } from 'globals'

import { Bold } from 'Components'
import { Modal, ModalPromptLike, ModalPromptHeader, ModalPromptDesc, DescTotalWarn, DescConsequences, ModalPromptActions, ConfirmAction, CancelAction } from 'Components'  // MODAL AND MODALOTHERS
import { RedLink } from 'Components' // LINK

export class DeleteModal extends React.PureComponent {
  constructor(props) {
    super(props) 
  }

	render () {
		const title = this.props.title

		return <Modal show={title} type="PROMPT" transparent={true} onClose={() => this.props.onClose()}>
            <ModalPromptLike>
              <ModalPromptHeader>
                You are about to delete
                <Bold>&nbsp;{title}</Bold>!
              </ModalPromptHeader>
              <ModalPromptDesc style={{fontSize:"2vmin"}}>
                <DescTotalWarn>Are you sure you want to delete this show? This action cannot be undone...</DescTotalWarn>
                <DescConsequences>
                  If this show is currently active, deleting it will result in all purchases being returned back to the fans. The venue will also be informed of your decision to discontinue.
                  If deleting this concert is not something you want, and you have others questions or concerns you can contact us via
                  &nbsp;<RedLink href={paths.redpineFacebook()} target="_blank">facebook</RedLink>,
                  &nbsp;<RedLink href={paths.redpineTwitter()} target="_blank">twitter</RedLink> or
                  &nbsp;<RedLink href={paths.supportMail()} target="_blank">email</RedLink>.
                </DescConsequences>
              </ModalPromptDesc>
              <ModalPromptActions>
                <CancelAction onClick={() => this.props.onClose()}>
                  <i className="fa fa-arrow-left"></i>&nbsp;&nbsp;Cancel
                </CancelAction>
                <ConfirmAction onClick={() => this.props.onDelete()}>
                  Delete Show
                </ConfirmAction>
              </ModalPromptActions>
            </ModalPromptLike>
          </Modal>
	}
}
