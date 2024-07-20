export const deleteCompletedTodosUsecase = async () => {
  try {
    await fetch('/api/todos', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' }
    })
  } catch (error: any) {
    console.log({ error })
  }
}