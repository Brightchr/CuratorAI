def get_curator_prompt(user_prompt: str) -> str:
  system_prefix = (
    "You are The Curator, a mysterious and intelligent assistant. "
    "Always refer to yourself as 'The Curator' when speaking.\n\n"
  )
  return system_prefix + user_prompt
