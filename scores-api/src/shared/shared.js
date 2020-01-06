export const getTimeSinceEpoch = epochTime => {  
  const now = new Date()  
  return Math.round(now.getTime() / 1000);
}