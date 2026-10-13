<script lang='ts'>
  import type { ProjectData } from '$lib/projects'
  import { resolve } from '$app/paths'
  import ExternalLink from '$lib/components/ExternalLink.svelte'
  import TechBadge from '$lib/components/TechBadge.svelte'
  import technologies, { getEquivalentTechIds } from '$lib/data/technologies'
  import projects from '$lib/projects'
  import { SvelteSet } from 'svelte/reactivity'

  let selectedTechIds = $state<string[]>([])

  function toggleTech(id: string) {
    selectedTechIds = selectedTechIds.includes(id)
      ? selectedTechIds.filter(t => t !== id)
      : [...selectedTechIds, id]
  }

  const matchingTechIds = $derived.by(() => {
    const set = new SvelteSet<string>()
    for (const id of selectedTechIds) {
      for (const equiv of getEquivalentTechIds(id))
        set.add(equiv)
    }
    return set
  })

  function matchesFilter(project: ProjectData): boolean {
    if (matchingTechIds.size === 0)
      return true

    return (project.metadata?.technologies ?? []).some(t =>
      matchingTechIds.has(t.id),
    )
  }

  const professionalProjects = $derived(
    projects.filter(
      project =>
        project.metadata?.type === 'professional' && matchesFilter(project),
    ),
  )
  const personalProjects = $derived(
    projects.filter(
      project =>
        project.metadata?.type === 'personal' && matchesFilter(project),
    ),
  )
  const studyProjects = $derived(
    projects.filter(
      project => project.metadata?.type === 'study' && matchesFilter(project),
    ),
  )
</script>

{#snippet projectRow(project: ProjectData)}
  <div class='flex flex-col gap-2'>
    <div class='flex flex-row gap-3'>
      <div class='min-w-0 flex flex-1 flex-col gap-1'>
        <div class='flex flex-row items-center justify-between gap-2'>
          <a
            href={resolve(`/project/${project.slug}`)}
            class='group w-max flex flex-row items-center gap-1 text-foreground no-underline'
          >
            <h3 class='text-xl'>{project.title}</h3>
            <div
              class='i-pepicons-pop:arrow-right project-arrow size-6 self-center transition-150'
            ></div>
          </a>
          {#if project.metadata?.source}
            <a
              href={project.metadata.source}
              target='_blank'
              rel='external'
              title='View source'
              class='flex shrink-0 items-center text-muted-foreground no-underline transition-150 hover:text-foreground'
            >
              <div class='i-simple-icons:github size-5'></div>
            </a>
          {/if}
        </div>
        {#if project.metadata?.visit}
          <ExternalLink
            text={project.metadata.visit}
            url={project.metadata.visit}
            class='mb-1'
          />
        {/if}
        <p class='m-0 text-muted-foreground'>{project.metadata?.description}</p>
      </div>
      <a
        href={resolve(`/project/${project.slug}`)}
        class='project-image-link shrink-0 self-start rounded-xl'
      >
        <img
          src={project.image}
          alt={project.title}
          class='project-image aspect-square h-auto w-24 rounded-xl shadow shadow-lg shadow-shadow sm:w-32'
        />
      </a>
    </div>
    <div class='flex flex-wrap gap-2'>
      {#each project.metadata?.technologies?.filter(t => t.showInBrief) ?? [] as tech (tech.id)}
        <TechBadge {tech} />
      {/each}
    </div>
  </div>
{/snippet}

{#snippet projectsBlock(projects: ProjectData[])}
  <div class='flex flex-col gap-12'>
    {#each projects as project (project.slug)}
      {@render projectRow(project)}
    {/each}
  </div>
{/snippet}

<p>
  Based in Hungary, I am a developer who is interested in creating efficient and scalable software. I studied software development at <a href='https://jedlik.eu/'>Jedlik Ányos Technical School</a> and continued my education at <a href='https://www.elte.hu/'>Eötvös Loránd University</a>, earning a Bachelor's degree in Computer Science.
</p>
<p>
  After my studies, I gained experience working on various software projects as a freelance developer. I acquired valuable insights into the industry and greatly improved my task management and team collaboration skills. I love solving new problems and creating high-quality software. Additionally, I am continuously improving my skills through both academic studies and self-directed learning.
</p>
<p>
  I look forward to the opportunity to contribute my skills and experience to a dynamic team, adding meaningful value to the projects they undertake.
</p>
<hr class='my-6 w-1/2 border-border' />
<p>
  Below you can find some of the projects I have worked on, categorized into professional, personal, and study projects. You can filter them by the technologies used in each project by toggling the icons in the box.
</p>

<div class='my-6 b-2 b-border rounded-2xl b-solid bg-card p-2 py-2'>
  <div class='grid grid-cols-7'>
    {#each technologies as tech (tech.id)}
      {@const selected = selectedTechIds.includes(tech.id)}
      <button
        type='button'
        title={tech.name}
        aria-pressed={selected}
        onclick={() => toggleTech(tech.id)}
        class='tech-btn group relative m-0 aspect-square w-full flex cursor-pointer items-center justify-center b-none bg-transparent transition-150'
      >
        <div class={`${tech.icon}?mask tech-icon-mask ${selected ? 'is-selected' : ''}`}></div>
        <div class={`${tech.icon} tech-icon-colored ${selected ? 'is-selected' : ''}`}></div>
      </button>
    {/each}
  </div>
</div>

<div class='flex flex-col gap-14'>
  {#if professionalProjects.length > 0}
    <div>
      <h2>Professional</h2>
      {@render projectsBlock(professionalProjects)}
    </div>
  {/if}
  {#if personalProjects.length > 0}
    <div>
      <h2>Personal</h2>
      {@render projectsBlock(personalProjects)}
    </div>
  {/if}
  {#if studyProjects.length > 0}
    <div>
      <h2>Study</h2>
      {@render projectsBlock(studyProjects)}
    </div>
  {/if}
</div>

<style>
  h2,
  h3,
  a {
    --uno: m-0;
  }
  h2 {
    --uno: text-muted-foreground my-3;
  }
  p {
    --uno: text-lg line-height-7 font-light;
  }
  div p {
    --uno: text-4 line-height-5;
  }

  p a {
    --uno: text-primary-foreground underline-offset-4 transition-300;
  }
  p a:hover {
    --uno: text-accent-hover transition-150;
  }

  button div {
    --uno: absolute inset-0 m-auto size-8 sm:size-12 transition-opacity
      duration-200 transition-opacity duration-200 text-card-foreground;
  }

  .tech-icon-mask {
    opacity: 1;
  }
  .tech-icon-colored {
    opacity: 0;
  }
  .tech-icon-mask.is-selected {
    opacity: 0;
  }
  .tech-icon-colored.is-selected {
    opacity: 1;
  }

  .project-image {
    object-fit: cover;
  }

  .project-arrow {
    opacity: 1;
    transform: translateX(0);
  }
  @media (hover: hover) {
    .project-arrow {
      opacity: 0;
      transform: translateX(-0.25rem);
    }
    .group:hover .project-arrow {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @media (hover: hover) {
    .tech-btn:hover .tech-icon-mask {
      opacity: 0;
    }
    .tech-btn:hover .tech-icon-colored {
      opacity: 1;
    }
  }
</style>
