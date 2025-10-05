export const formatDate = (dateString: string) => {
  if (!dateString) {
    return 'Дата неизвестна'
  }

  return new Date(dateString).toLocaleDateString('ru-RU')
}
