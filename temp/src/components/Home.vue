<template>
  <Page class="page">
    <ActionBar class="action-bar" title="Home"/>

    <StackLayout>
      <Button class="btn btn-primary" @tap="$router.push({name: 'login'})">Login</Button>
    </StackLayout>

  </Page>
</template>
