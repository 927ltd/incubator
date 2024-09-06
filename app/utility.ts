const APP = process.env.NEXT_PUBLIC_APP

// allows loading diffirent logo with custom css className attribute for each app
export const genLogoFunc = async (): Promise<() => React.ReactElement> => {
  return (await import(`./(${APP})/components/Logo`)).default
}
