import { createApp } from 'vue'
import ModalClassic from '@/components/ModalClassic.vue'

type ModalProps = {
  title: string
  bodyText: string
  action?: () => void
}

let currentModal: ReturnType<typeof createApp> | null = null

const modalService = {
  show({ title, bodyText, action }: ModalProps) {
    if (currentModal !== null) {
      return
    }

    const modalElement = document.createElement('div')
    document.body.appendChild(modalElement)

    const modalComponent = createApp(ModalClassic, {
      title,
      bodyText,
      action,
      onClose: () => {
        if (currentModal !== null) {
          currentModal.unmount()
          document.body.removeChild(modalElement)
          currentModal = null
        }
      }
    })

    currentModal = modalComponent
    modalComponent.mount(modalElement)
  }
}

export default modalService
